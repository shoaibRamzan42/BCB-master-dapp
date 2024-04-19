import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './i18n'; 
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import { WagmiConfig, configureChains, createConfig } from 'wagmi';
import {  arbitrum  } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public'
import i18next from 'i18next';
import Routers from './Routes';
import { BrowserRouter } from 'react-router-dom';


const projectId = '3bc9b13ede2c46a106c03bfadb9129e8';

const chains = [arbitrum];
const { publicClient, webSocketPublicClient } = configureChains(chains, [w3mProvider({ projectId }), publicProvider()]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({
    projectId,
    chains,
  }),
  publicClient,
  webSocketPublicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

function AppInitializer() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) {
    return null;
  }

  return (
    <>
      <WagmiConfig config={wagmiConfig}>
      <BrowserRouter>
        <Routers/>
      </BrowserRouter>
        
      </WagmiConfig>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppInitializer />
    <Web3Modal projectId={projectId} ethereumClient={ethereumClient}
      defaultChain={arbitrum}
    />
  </React.StrictMode>
);