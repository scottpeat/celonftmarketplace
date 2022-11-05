import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Listing from '../components/Listing';
import { createClient } from 'urql';
import styled from 'styled-components';
import Link from 'next/link';
import { SUBGRAPH_URL } from '../constants';
import { useAccount } from 'wagmi';
