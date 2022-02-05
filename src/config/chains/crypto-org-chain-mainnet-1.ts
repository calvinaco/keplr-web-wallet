import { ChainConfig, ChainNetwork, ChainSource } from '../../apptypes.d';

const CryptoOrgChainMainnet_1: ChainConfig = {
  id: 'crypto-org-chain-mainnet-1',
  name: 'Crypto.org Chain',
  network: ChainNetwork.Mainnet,
  source: ChainSource.KeplrDefault,
  rpcBaseURLs: {
    lcd: 'https://lcd-crypto-org.keplr.app',
  },
  currencyList: [
    {
      coinMinimalDenom: 'basecro',
      coinDenom: 'CRO',
      coinDecimals: 18,
      alwaysDisplay: true,
    },
  ],
};

export { CryptoOrgChainMainnet_1 };
