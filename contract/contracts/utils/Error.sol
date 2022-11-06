// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

error InsufficientFunds(uint256 expected, uint256 actual);

error TransferFailed();

error InvalidCall(bytes data);

error NotExists(uint256 tokenId);

error NotOwner(address operator);

error NotApproved(address nftAddress, uint256 tokenId);

error NotOwnerNorApproved(address operator);

error InvalidNftAddress(address nftAddress);

error ContractAlreadyExists(address nftAddress);

error ContractNotExists(address nftAddress);

error NotListed(address nftAddress, uint256 tokenId, address owner);

error AlreadyListed(address nftAddress, uint256 tokenId, address owner);

error CurrentlyRented(address nftAddress, uint256 tokenId);

error InvalidExpires(uint64 expires);

error InvalidTimestamps(uint256 start, uint256 end);

error InvalidAmount(uint256 price);

error InvalidPayToken(address payToken);

error NoProceeds(address operator, address token);

error NotRedeemable(address nftAddress, uint256 tokenId);
