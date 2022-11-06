// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IRentableNft {
    event Minted(
        uint256 indexed tokenId,
        address indexed owner,
        address indexed minter
    );

    event Burned(uint256 indexed tokenId, address indexed operator);

    event PlatformFeeUpdated(uint256 indexed newFee);

    event FeeRecipientUpdated(address payable indexed newRecipient);

    function mint(address to, string calldata uri) external payable;

    function burn(uint256 tokenId) external;

    function isApproved(uint256 tokenId, address operator)
        external
        view
        returns (bool);

    function getTokenCounter() external view returns (uint256);

    function getExists(uint256 tokenId) external view returns (bool);

    function getRentMarketplace() external view returns (address);

    function getPlatformFee() external view returns (uint256);

    function setPlatformFee(uint256 newFee) external;

    function getFeeRecipient() external view returns (address payable);

    function setFeeRecipient(address payable newRecipient) external;
}
