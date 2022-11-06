// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../rentnftcontract/interfaces/IERC4907.sol";
import "./interfaces/IRentMarketplace.sol";
import "../utils/Error.sol";

contract Marketplace is Ownable, ReentrancyGuard, IRentMarketplace {
    mapping(address => mapping(uint256 => address)) private _owners;

    mapping(address => mapping(uint256 => mapping(address => Listing)))
        private _listings;

    mapping(address => mapping(address => uint256)) private _proceeds;

    uint16 private _platformFee;

    address payable private _feeRecipient;

    bytes4 internal constant ON_ERC721_RECEIVED = 0x150b7a02;
    bytes4 internal constant INTERFACE_ID_ERC4907 = 0xad092b5c;
    uint256 internal constant MAX_UINT64 = 0xffffffffffffffff;

    constructor(uint16 platformFee, address payable feeRecipient) {
        _platformFee = platformFee;
        _feeRecipient = feeRecipient;
    }

    receive() external payable {
        _proceeds[_msgSender()][address(0)] += msg.value;
    }

    fallback() external payable {
        revert InvalidCall(_msgData());
    }

    function listItem(
        address nftAddress,
        uint256 tokenId,
        uint256 start,
        uint256 end,
        uint256 pricePerSecond,
        address payToken
    ) external override {
        IERC721 nft = IERC721(nftAddress);
        address owner = nft.ownerOf(tokenId);

        if (_listings[nftAddress][tokenId][owner].pricePerSecond != 0)
            revert AlreadyListed(nftAddress, tokenId, owner);

        if (
            nft.getApproved(tokenId) != address(this) &&
            !nft.isApprovedForAll(owner, address(this))
        ) revert NotApproved(nftAddress, tokenId);

        if (owner != _msgSender()) revert NotOwner(_msgSender());

        if (!IERC165(nftAddress).supportsInterface(INTERFACE_ID_ERC4907))
            revert InvalidNftAddress(nftAddress);

        if (start == 0) start = block.timestamp;

        _validTimestamps(start, block.timestamp, end, MAX_UINT64);

        _validPayment(pricePerSecond, 1, payToken);

        _listings[nftAddress][tokenId][owner] = Listing(
            start,
            end,
            pricePerSecond,
            payToken
        );
        emit ItemListed(
            nftAddress,
            tokenId,
            owner,
            start,
            end,
            pricePerSecond,
            payToken
        );
    }

    function updateListing(
        address nftAddress,
        uint256 tokenId,
        uint256 start,
        uint256 end,
        uint256 pricePerSecond,
        address payToken
    ) external override {
        address owner = IERC721(nftAddress).ownerOf(tokenId);
        if (_msgSender() != owner) revert NotOwner(_msgSender());
        if (_listings[nftAddress][tokenId][owner].pricePerSecond == 0)
            revert NotListed(nftAddress, tokenId, owner);

        if (start == 0) start = block.timestamp;

        _validTimestamps(start, block.timestamp, end, MAX_UINT64);

        _validPayment(pricePerSecond, 1, payToken);

        _listings[nftAddress][tokenId][owner] = Listing(
            start,
            end,
            pricePerSecond,
            payToken
        );
        emit ListingUpdated(
            nftAddress,
            tokenId,
            owner,
            start,
            end,
            pricePerSecond,
            payToken
        );
    }

    function rentItem(
        address nftAddress,
        uint256 tokenId,
        uint256 start,
        uint256 end,
        address payToken
    ) external payable override nonReentrant {
        IERC721 nft = IERC721(nftAddress);
        address owner = getOwnerOf(nftAddress, tokenId);
        address renter = _msgSender();
        Listing memory listing = _listings[nftAddress][tokenId][owner];

        if (listing.pricePerSecond == 0)
            revert NotListed(nftAddress, tokenId, owner);

        if (IERC4907(nftAddress).userOf(tokenId) != address(0))
            revert CurrentlyRented(nftAddress, tokenId);

        if (start == 0) start = block.timestamp;

        _validTimestamps(start, listing.start, end, listing.end);

        uint256 minRentPrice = (end - start + 1) * listing.pricePerSecond;
        uint256 fee = (minRentPrice * uint256(_platformFee)) / 10000;

        uint256 amount = listing.payToken == address(0)
            ? msg.value
            : IERC20(listing.payToken).allowance(renter, address(this));
        _validPayment(amount, minRentPrice + fee, payToken);

        if (listing.payToken != address(0)) {
            bool success = IERC20(listing.payToken).transferFrom(
                renter,
                address(this),
                minRentPrice + fee
            );
            if (!success) revert TransferFailed();
        }

        if (nft.ownerOf(tokenId) != address(this)) {
            nft.safeTransferFrom(owner, address(this), tokenId);
        }

        IERC4907(nftAddress).setUser(tokenId, renter, uint64(end));

        _proceeds[_feeRecipient][payToken] += fee;
        _proceeds[owner][payToken] += msg.value - fee;

        emit ItemRented(
            nftAddress,
            tokenId,
            owner,
            renter,
            start,
            end,
            msg.value,
            payToken
        );
    }

    function redeemItem(address nftAddress, uint256 tokenId) external override {
        if (IERC4907(nftAddress).userOf(tokenId) != address(0))
            revert CurrentlyRented(nftAddress, tokenId);

        address owner = getOwnerOf(nftAddress, tokenId);
        if (owner != _msgSender()) revert NotOwner(_msgSender());

        IERC721(nftAddress).transferFrom(address(this), owner, tokenId);
        delete (_owners[nftAddress][tokenId]);
        emit ItemRedeemed(nftAddress, tokenId, owner);
    }

    function cancelListing(address nftAddress, uint256 tokenId)
        external
        override
    {
        address operator = _msgSender();

        if (_listings[nftAddress][tokenId][operator].pricePerSecond == 0)
            revert NotListed(nftAddress, tokenId, operator);

        delete (_listings[nftAddress][tokenId][operator]);
        emit ListingCanceled(nftAddress, tokenId, operator);
    }

    function withdrawProceeds(address payToken) external override {
        address operator = _msgSender();
        uint256 proceeds = _proceeds[operator][payToken];

        if (proceeds == 0) revert NoProceeds(operator, payToken);

        delete (_proceeds[operator][payToken]);

        if (payToken == address(0)) {
            (bool success, ) = payable(operator).call{
                value: proceeds,
                gas: 2300
            }("");
            if (!success) revert TransferFailed();
        } else {
            bool success = IERC20(payToken).transferFrom(
                address(this),
                operator,
                proceeds
            );
            if (!success) revert TransferFailed();
        }
        emit ProceedsWithdrawn(operator, payToken, proceeds);
    }

    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external override returns (bytes4) {
        if (operator != address(this)) revert();
        if (_owners[_msgSender()][tokenId] != address(0)) revert();
        _owners[_msgSender()][tokenId] = from;
        return ON_ERC721_RECEIVED;
    }

    function _validTimestamps(
        uint256 start,
        uint256 minTimestamp,
        uint256 end,
        uint256 maxTimestamp
    ) internal pure {
        if ((start < minTimestamp) || (maxTimestamp < end) || (end < start))
            revert InvalidTimestamps(start, end);
    }

    function _validPayment(
        uint256 amount,
        uint256 minAmount,
        address payToken
    ) internal pure {
        if (minAmount < amount) revert InvalidAmount(amount);
        if ((payToken != address(0))) revert InvalidPayToken(payToken);
    }

    function getOwnerOf(address nftAddress, uint256 tokenId)
        public
        view
        override
        returns (address)
    {
        address owner = IERC721(nftAddress).ownerOf(tokenId);
        if (owner != address(this)) return owner;
        return _owners[nftAddress][tokenId];
    }

    function getListing(
        address nftAddress,
        uint256 tokenId,
        address operator
    ) external view override returns (Listing memory) {
        return _listings[nftAddress][tokenId][operator];
    }

    function getProceeds(address operator, address payToken)
        external
        view
        override
        returns (uint256)
    {
        return _proceeds[operator][payToken];
    }

    function getFeeRecipient() external view override returns (address) {
        return _feeRecipient;
    }

    function setFeeRecipient(address payable newFeeRecipient)
        external
        override
        onlyOwner
    {
        _feeRecipient = newFeeRecipient;
    }

    function getPlatformFee() external view override returns (uint16) {
        return _platformFee;
    }

    function setPlatformFee(uint16 newPlatformFee) external override onlyOwner {
        _platformFee = newPlatformFee;
    }
    function getBlocktime() returns (uint256){
        return block.timestamp
    }
    function calculateTimeStamp(uint256 days) returns (uint256){
        return block.timestamp + (60 * 60 * 24 * days) 
    }
}
