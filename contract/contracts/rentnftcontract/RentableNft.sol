// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "../utils/Error.sol";
import "./ERC4907.sol";
import "./interfaces/IRentableNft.sol";

contract RentableNft is ERC4907, IRentableNft, Ownable {
    uint256 private _tokenCounter;

    address private _rentMarketplace;

    uint256 private _platformFee;

    address payable private _feeRecipient;

    constructor(
        string memory name_,
        string memory symbol_,
        address rentMarketplace,
        uint256 platformFee,
        address payable feeRecipient
    ) ERC4907(name_, symbol_) {
        _tokenCounter = 0;
        _rentMarketplace = rentMarketplace;
        _platformFee = platformFee;
        emit PlatformFeeUpdated(platformFee);
        _feeRecipient = feeRecipient;
        emit FeeRecipientUpdated(feeRecipient);
    }

    function mint(address to, string calldata uri) external payable override {
        // require fees are paid
        // if (msg.value < _platformFee) revert InsufficientFunds(_platformFee, msg.value);

        // mint new rentable NFT
        uint256 tokenId = _tokenCounter;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        _tokenCounter += 1;

        // send fee to fee recipient
        // (bool success, ) = _feeRecipient.call{value: msg.value, gas: 2300}("");
        // if (!success) revert TransferFailed();

        emit Minted(tokenId, to, _msgSender());
    }

    function burn(uint256 tokenId) external override {
        address operator = _msgSender();
        if ((ownerOf(tokenId) != operator) && (!isApproved(tokenId, operator)))
            revert NotOwnerNorApproved(operator);

        _burn(tokenId);
        emit Burned(tokenId, operator);
    }

    function isApproved(uint256 tokenId, address operator)
        public
        view
        override
        returns (bool)
    {
        return
            isApprovedForAll(ownerOf(tokenId), operator) ||
            getApproved(tokenId) == operator;
    }

    function isApprovedForAll(address owner, address operator)
        public
        view
        override
        returns (bool)
    {
        if ((_rentMarketplace == operator)) {
            return true;
        }
        return super.isApprovedForAll(owner, operator);
    }

    function _isApprovedOrOwner(address spender, uint256 tokenId)
        internal
        view
        override
        returns (bool)
    {
        if (!_exists(tokenId)) revert NotExists(tokenId);
        address owner = ERC721.ownerOf(tokenId);
        if (isApprovedForAll(owner, spender)) return true;
        return super._isApprovedOrOwner(spender, tokenId);
    }

    function getTokenCounter() external view override returns (uint256) {
        return _tokenCounter;
    }

    function getExists(uint256 tokenId) external view override returns (bool) {
        return _exists(tokenId);
    }

    function getRentMarketplace() external view override returns (address) {
        return _rentMarketplace;
    }

    function getPlatformFee() external view override returns (uint256) {
        return _platformFee;
    }

    function setPlatformFee(uint256 newFee) external override onlyOwner {
        _platformFee = newFee;
        emit PlatformFeeUpdated(newFee);
    }

    function getFeeRecipient()
        external
        view
        override
        returns (address payable)
    {
        return _feeRecipient;
    }

    function setFeeRecipient(address payable newRecipient)
        external
        override
        onlyOwner
    {
        _feeRecipient = newRecipient;
        emit FeeRecipientUpdated(newRecipient);
    }
}
