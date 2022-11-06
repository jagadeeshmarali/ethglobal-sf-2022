// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

interface IRentMarketplace is IERC721Receiver {
    struct Listing {
        uint256 start;
        uint256 end;
        uint256 pricePerSecond;
        address payToken;
    }

    event ItemListed(
        address indexed nftAddress,
        uint256 indexed tokenId,
        address indexed owner,
        uint256 start,
        uint256 end,
        uint256 pricePerSecond,
        address payToken
    );

    event ListingUpdated(
        address indexed nftAddress,
        uint256 indexed tokenId,
        address indexed owner,
        uint256 start,
        uint256 end,
        uint256 pricePerSecond,
        address payToken
    );

    event ItemRented(
        address indexed nftAddress,
        uint256 tokenId,
        address indexed owner,
        address indexed renter,
        uint256 start,
        uint256 end,
        uint256 pricePaid,
        address payToken
    );

    event ItemRedeemed(
        address indexed nftAddress,
        uint256 indexed tokenId,
        address indexed owner
    );

    event ListingCanceled(
        address indexed nftAddress,
        uint256 indexed tokenId,
        address indexed owner
    );

    event ProceedsWithdrawn(
        address indexed operator,
        address indexed payToken,
        uint256 proceeds
    );

    function listItem(
        address nftAddress,
        uint256 tokenId,
        uint256 start,
        uint256 end,
        uint256 pricePerSecond,
        address payToken
    ) external;

    function updateListing(
        address nftAddress,
        uint256 tokenId,
        uint256 start,
        uint256 end,
        uint256 pricePerSecond,
        address payToken
    ) external;

    function rentItem(
        address nftAddress,
        uint256 tokenId,
        uint256 start,
        uint256 end,
        address payToken
    ) external payable;

    function redeemItem(address nftAddress, uint256 tokenId) external;

    function cancelListing(address nftAddress, uint256 tokenId) external;

    function withdrawProceeds(address token) external;

    function getOwnerOf(address nftAddress, uint256 tokenId)
        external
        view
        returns (address);

    function getListing(
        address nftAddress,
        uint256 tokenId,
        address operator
    ) external view returns (Listing memory);

    function getProceeds(address operator, address currency)
        external
        view
        returns (uint256);

    function getFeeRecipient() external view returns (address);

    function setFeeRecipient(address payable newFeeRecipient) external;

    function getPlatformFee() external view returns (uint16);

    function setPlatformFee(uint16 newFee) external;
}
