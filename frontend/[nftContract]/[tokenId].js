import { Contract } from 'ethers';
import { formatEther, parseEther } from 'ethers/lib/utils';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { createClient } from 'urql';
import { useContract, useSigner, erc721ABI } from 'wagmi';
import MarketplaceABI from '../../abis/NFTMarketplace.json';
import Navbar from '../../components/Navbar';
import { MARKETPLACE_ADDRESS, SUBGRAPH_URL } from '../../constants';
import styled from 'styled-components';

export default function NFTDetails() {
  // Extract NFT contract address and Token ID from URL
  const router = useRouter();
  const nftAddress = router.query.nftContract;
  const tokenId = router.query.tokenId;

  // State variables to contain NFT and listing information
  const [listing, setListing] = useState();
  const [name, setName] = useState('');
  const [imageURI, setImageURI] = useState('');
  const [isOwner, setIsOwner] = useState(false);
  const [isActive, setIsActive] = useState(false);

  // State variable to contain new price if updating listing
  const [newPrice, setNewPrice] = useState('');

  // State variables to contain various loading states
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(true);
  const [canceling, setCanceling] = useState(false);
  const [buyer, setBuying] = useState(false);

  // Fetch signer from wagmi
  const { data: signer } = useSigner();

  const MarketplaceContract = useContract({
    addressOrName: MARKETPLACE_ADDRESS,
    contractInterface: MarketplaceABI,
    signerOrProvider: signer,
  });
}

const Container = styled.div`
  display: flex;
  width: 80%;
  margin: auto;
  margin-top: 2rem;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & img {
    width: 512px;
    border-radius: 2rem;
  }

  & span {
    margin: 0.25rem;
    padding: 1rem;
    width: 100%;
    text-align: center;
    background-color: lightblue;
    border-radius: 1rem;
  }

  & span:first-of-type {
    margin-top: 1rem;
  }
`;

const Options = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UpdateListing = styled.div`
  display: flex;
  justify-content: space-between;

  & input {
    margin-right: 1rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid #cccccc;
  }
`;

const Button = styled.button`
  margin-top: 1rem;
  padding: 0.5rem;
`;
