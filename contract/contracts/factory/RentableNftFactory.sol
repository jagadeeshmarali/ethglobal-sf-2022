// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "../utils/Error.sol";
import "../rentnftcontract/RentableNft.sol";
import "./interfaces/IRentableNftFactory.sol";

contract RentableNftFactory is Ownable, IRentableNftFactory {
    mapping(address => address[]) _myProjects;

    address private _rentMarketplace;

    uint256 private _platformFee;

    address payable _feeRecipient;

    mapping(address => bool) private _exists;

    bytes4 internal constant INTERFACE_ID_ERC4907 = 0xad092b5c;

    constructor(
        address rentMarketplace,
        uint256 platformFee,
        address payable feeRecipient
    ) {
        _rentMarketplace = rentMarketplace;
        _platformFee = platformFee;
        _feeRecipient = feeRecipient;
    }

    function deployNftContract(
        string memory name,
        string memory symbol,
        uint256 mintFee,
        address payable feeRecipient
    ) external payable override returns (address) {
        if (msg.value < _platformFee)
            revert InsufficientFunds(_platformFee, msg.value);

        (bool success, ) = _feeRecipient.call{value: msg.value}("");
        if (!success) revert TransferFailed();

        RentableNft nft = new RentableNft(
            name,
            symbol,
            _rentMarketplace,
            mintFee,
            feeRecipient
        );
        nft.transferOwnership(_msgSender());
        _myProjects[_msgSender()].push(address(nft));
        _exists[address(nft)] = true;
        emit NftContractAdded(_msgSender(), address(nft));
        return address(nft);
    }

    function addNftContract(address nftContract) external override onlyOwner {
        if (_exists[nftContract]) revert ContractAlreadyExists(nftContract);

        if (!IERC165(nftContract).supportsInterface(INTERFACE_ID_ERC4907))
            revert InvalidNftAddress(nftContract);

        _exists[nftContract] = true;
        emit NftContractAdded(_msgSender(), nftContract);
    }

    function removeNftContract(address nftContract)
        external
        override
        onlyOwner
    {
        if (!_exists[nftContract]) revert ContractNotExists(nftContract);

        _exists[nftContract] = false;
        emit NftContractRemoved(_msgSender(), nftContract);
    }

    function mintNFT(
        uint256 index,
        address to,
        string calldata uri
    ) external payable override {
        address nft_contract = _myProjects[_msgSender()][index];
        RentableNft(nft_contract).mint(to, uri);
    }

    function getExists(address nftContract)
        external
        view
        override
        returns (bool)
    {
        return _exists[nftContract];
    }

    function getRentMarketplace() external view override returns (address) {
        return _rentMarketplace;
    }

    function setRentMarketplace(address newRentMarketplace)
        external
        override
        onlyOwner
    {
        _rentMarketplace = newRentMarketplace;
    }

    function getPlatformFee() external view override returns (uint256) {
        return _platformFee;
    }

    function setPlatformFee(uint256 newFee) external override onlyOwner {
        _platformFee = newFee;
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
    }

    function getMyProjects() external view returns (address[] memory) {
        return _myProjects[_msgSender()];
    }

    function getExistsForToken(uint256 contract_index, uint256 index)
        external
        view
        returns (bool)
    {
        address nft_contract = _myProjects[_msgSender()][contract_index];
        return RentableNft(nft_contract).getExists(index);
    }
}
