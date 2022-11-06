import { Contract } from 'ethers';
import { isAddress, parseEther } from 'ethers/lib/utils';
import Link from 'next/link';
import { useState } from 'react';
import { useSigner, erc721ABI } from 'wagmi';
import MarketplaceABI from '../abis/NFTMarketplace.json';
import NavBar from '../components/Navbar';
import { MARKETPLACE_ADDRESS } from '../constants';
import styled from 'styled-components';
import { fallbackExchange } from '@urql/core/dist/types/exchanges/fallback';

export default function Create() {
  // State variables to contain information about the NFT being sold
  const [nftAddress, setNftAddress] = useState('');
  const [tokenId, setTokenId] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [showListingLink, setShowListingLink] = useState(false);

  // Get signer from wagmi
  const { data: signer } = useSigner();
}

const Container = div`
    display: flex;
    flex-direction: column;
    padding: 5rem;
    margin: auto;
    margin-top: auto;
    border-radius: 1rem;
    border: 1px solid black;
    background-color: aliceblue;
    width: 50%;
    margin-top: 5%;
  
  & input {
    padding: 0.5rem;
    border-radius: 0.25rem;
    margin: 1rem 0 1rem 0;
  }
  
  & button:first-of-type {
    margin-bottom: 1rem;
  }
`;
