import { formatEther } from 'ethers/lib/utils';
import { useEffect, useState } from 'react';
import { useAccount, useContract, useProvider, erc721ABI } from 'wagmi';
import styled from 'styled-components';

export default function Listing(props) {
  // State variables to hold information about the NFT
  const [imageURI, setImageURI] = useState('');
  const [name, setName] = useState('');

  // Loading state
  const [loading, setLoading] = useState(true);

  // Get the provider, connected address, and a contract instance
  // for the NFT contract using wagmi
  const provider = useProvider();
  const { address, isConnected } = useAccount();
  const ERC721Contract = useContract({
    addressOrName: props.nftAddress,
    contractInterface: erc721ABI,
    signerOrProvider: provider,
  });

  // Check if the NFT seller is the connected user
  const isOwner = address.toLowerCase() === props.seller.toLowerCase();

  // Fetch NFT details by resolving the token URI
  async function fetchNFTDetails() {
    try {
      // Get token URI from contract
      let tokenURI = await ERC721Contract.tokenURI(0);
      // If it's an IPFS URI, replace it with an HTTP Gateway link
      tokenURI = tokenURI.replace('ipfs://', 'https://ipfs.io/ipfs/');

      // Resolve the Token URI
      const metadata = await fetch(tokenURI);
      const metadataJSON = await metadata.json();

      // Extract image URI from the metadata
      let image = metadataJSON.imageUrl;
      // If it's an IPFS URI, replace it with an HTTP Gateway link
      image = image.replace('ipfs://', 'https://ipfs.io/ipfs/');

      // Update state variables
      setName(metadataJSON.name);
      setImageURI(image);
      setLoading(false);
    } catch (error) {}
  }

  // Fetch the NFT details when component is loaded
  useEffect(() => {
    if (isConnected && address) {
      fetchNFTDetails();
    }
  }, [isConnected]);

  if (!isConnected) return null;

  return (
    <div>
      {loading ? (
        <span>Loading</span>
      ) : (
        <Card>
          <img src={imageURI} />
          <Container>
            <span>
              <b>
                {name} - #{props.tokenId}
              </b>
            </span>
            <span>Price: {formatEther(props.price)} CELO</span>
            <span>
              Seller: {isOwner ? 'You' : props.seller.substring(0, 6) + '...'}
            </span>
          </Container>
        </Card>
      )}
    </div>
  );
}

const Card = styled.div`
  /* Add shadows to create the "card" effect */
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 256px;
  border-radius: 5%;
  cursor: pointer;
  margin-top: 1rem;
  margin-left: 1rem;

  & img {
    width: 100%;
    border-top-left-radius: 5%;
    border-top-right-radius: 5%;
  }

  /* On mouse-over, add a deeper shadow */
  & :hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
`;

const Container = styled.div`
  /* Add some padding inside the card container */
  display: flex;
  flex-direction: column;
  padding: 2px 16px;
`;
