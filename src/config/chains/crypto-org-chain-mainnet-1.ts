import { Chain, ChainNetwork, ChainSource } from '../../apptypes.d';

const CryptoOrgChainMainnet_1: Chain = {
  id: 'crypto-org-chain-mainnet-1',
  name: 'Crypto.org Chain',
  network: ChainNetwork.Mainnet,
  source: ChainSource.KeplrDefault,
  rpcBaseURLs: {
    lcd: 'https://lcd-crypto-org.keplr.app',
  },
};

export { CryptoOrgChainMainnet_1 };
