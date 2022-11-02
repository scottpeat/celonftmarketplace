// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract NFTMarketplace {

    struct Listing {
        uint256 price;
        adddress seller;
    }

    mapping(address => mapping(uint256 => Listing)) public listings;

    // Requires the msg.sender is the owner of the specified NFT
    modifier isNFTOwner(address nftAddress, uint256 tokenId) {
        require(
            IERC721(nftAddress).ownerOf(tokenId) == msg.sender,
            "MRKT: Not the owner"
        );
        _;
    }

    // Requires that the specified NFT is not already listed for sale
    modifier isNotListed(address nftAddress, uint256 tokenId) {
        require(listings[nftAddress][tokenId].price == 0, "MRKT: Already listed");
        _;
    }

    // Requires that the specified NFT is already listed for sale
    modifier isListed(address nftAddress, uint256 tokenId) {
        require(listings[nftAddress][tokeId].price > 0, "MRKT: Not listed");
        _;
    }

    event ListingCreated(
    address nftAddress,
    uint256 tokenId,
    uint256 price,
    address seller
    );

    function createListing(
        address nftAddress,
        uint256 tokenId,
        uint256 price
    )
        external
        isNotListed(nftAddress, tokenId)
        isNFTOwner(nftAddress, tokenId)
    {
        require(price > 0, "MRKT: Price must be > 0");
        IERC721 nftContract = IERC721(nftAddress);
        require(
            nftContract.isApprovedForAll(msg.sender, address(this)) ||
                nftContract.getApproved(tokenId) == address(this),
            "MRKT: No approval for NFT"
        );
        listings[nftAddress][tokenId] = Listing({
            price: price,
            seller: msg.sender
        });

        emit ListingCreated(nftAddress, tokenId, price, msg.sender);
    }

   event ListingCanceled(address nftAddress, uint256 tokenId, address seller);

    function cancelListing(address nftAddress, uint256 tokenId)
    external
    isListed(nftAddress, tokenId)
    isNFTOwner(nftAddress, tokenId)
{
    // Delete the Listing struct from the mapping
    // Freeing up storage saves gas!
    delete listings[nftAddress][tokenId];

    // Emit the event
    emit ListingCanceled(nftAddress, tokenId, msg.sender);
}
}