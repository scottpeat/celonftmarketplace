import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import styled from 'styled-components';

export default function Navbar() {
  return (
    <NavBar>
      <Link href="/">Home</Link>
      <Link href="/create">Create Listing</Link>
      <ConnectButton />
    </NavBar>
  );
}

const NavBar = styled.nav`
  display: flex;
  justify-content: center;
  column-gap: 2em;
  align-items: center;
  background-color: antiquewhite;
  padding: 1em 0 1em 0;
  font-size: 16px;

  & a:hover {
    font-weight: bold;
  }
`;
