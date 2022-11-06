// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IRentableNftFactory {
    event NftContractAdded(
        address indexed operator,
        address indexed nftContract
    );

    event NftContractRemoved(
        address indexed operator,
        address indexed nftContract
    );

    function deployNftContract(
        string memory name,
        string memory symbol,
        uint256 mintFee,
        address payable feeRecipient
    ) external payable returns (address);

    function addNftContract(address nftContract) external;

    function mintNFT(
        uint256 index,
        address to,
        string memory uri
    ) external payable;

    function removeNftContract(address nftContract) external;

    function getExists(address nftContract) external view returns (bool);

    function getRentMarketplace() external view returns (address);

    function setRentMarketplace(address newRentMarketplace) external;

    function getPlatformFee() external view returns (uint256);

    function setPlatformFee(uint256 newFee) external;

    function getFeeRecipient() external view returns (address payable);

    function setFeeRecipient(address payable newRecipient) external;
}
