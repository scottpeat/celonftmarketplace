// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract NFTMarketplace {

    struct Listing {
        uint256 price;
        adddress seller;
    }

    mapping(address => mapping(uint256 => Listing)) public listings;

    
    
}