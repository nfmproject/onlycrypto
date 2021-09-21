import React, { useCallback, useEffect, useState } from 'react';
import Web3Modal from 'web3modal';
import WalletConnectProvider from "@walletconnect/web3-provider";
import Torus from "@toruslabs/torus-embed";
import Portis from "@portis/web3";
import { StaticJsonRpcProvider, Web3Provider } from '@ethersproject/providers';

import Layout from './components/Layout';
import GlobalStyles from './styles/GlobalStyles';
import { useUserProvider } from './hooks';

import { INFURA_ID, NETWORKS, NETWORK } from './constants';





/*
  Web3 modal helps us "connect" external wallets:
*/
const web3Modal = new Web3Modal({
  theme: "dark",
  // network: "mainnet", // optional
  cacheProvider: true, // optional
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: INFURA_ID,
      },
    },
    portis: {
      package: Portis, // required
      options: {
        id: "PORTIS_ID" // required
      }
    },
    torus: {
      package: Torus, // required
      options: {
        networkParams: {
          host: "https://localhost:8545", // optional
          chainId: 1337, // optional
          networkId: 1337 // optional
        },
        config: {
          buildEnv: "development" // optional
        }
      }
    },
  },
});

const logoutOfWeb3Modal = async () => {
  await web3Modal.clearCachedProvider();
  setTimeout(() => {
    window.location.reload();
  }, 1);
};

/// 📡 What chain are your contracts deployed to?
const targetNetwork = NETWORKS.ropsten; // <-- (localhost, rinkeby, xdai, mainnet)

// 😬 Sorry for all the console logging
const DEBUG = true;

// 🛰 providers
if (DEBUG) console.log('📡 Connecting to Mainnet Ethereum');

const mainnetInfura = new StaticJsonRpcProvider('https://mainnet.infura.io/v3/' + INFURA_ID);

// 🏠 Your local provider is usually pointed at your local blockchain
const localProviderUrl = targetNetwork.rpcUrl;
// as you deploy to other networks you can set REACT_APP_PROVIDER=https://dai.poa.network in packages/react-app/.env
const localProviderUrlFromEnv = process.env.REACT_APP_PROVIDER
  ? process.env.REACT_APP_PROVIDER
  : localProviderUrl;

if (DEBUG) console.log('🏠 Connecting to provider:', localProviderUrlFromEnv);


function App() {

  const mainnetProvider = mainnetInfura;
  const localProvider = new StaticJsonRpcProvider(localProviderUrlFromEnv);

  const [injectedProvider, setInjectedProvider] = useState<Web3Provider>();

  // Use your injected provider from 🦊 Metamask or
  // if you don't have it then instantly generate a 🔥 burner wallet.
  const userProvider = useUserProvider(injectedProvider, localProvider);

  // You can warn the user if you would like them to be on a specific network
  const localChainId = localProvider && localProvider._network && localProvider._network.chainId;
  const selectedChainId = userProvider && userProvider._network && userProvider._network.chainId;

  //
  // 🧫 DEBUG 👨🏻‍🔬
  //
  useEffect(() => {
    if (
      DEBUG
    ) {
      console.log('_____________________________________ 🏗 NFM-Project _____________________________________');
      console.log('🌎 mainnetProvider', mainnetProvider);
      console.log('🏠 localChainId', localChainId);
      console.log('🕵🏻‍♂️ selectedChainId:', selectedChainId);
    }
  }, [
    mainnetProvider,
    selectedChainId,
  ]);

  const loadWeb3Modal = useCallback(async () => {
    console.log("inside loadweb3")
    const provider = await web3Modal.connect();
    setInjectedProvider(new Web3Provider(provider));
  }, [setInjectedProvider]);

  useEffect(() => {
    console.log("I am here", web3Modal)
    // if (web3Modal.cachedProvider) {
    loadWeb3Modal();
    // }
  }, [loadWeb3Modal]);


  return (
    <>
      <Layout />
      <GlobalStyles />
    </>
  );
}

export default App;
