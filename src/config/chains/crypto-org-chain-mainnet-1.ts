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
      coinDecimals: 8,
      alwaysDisplay: true,
    },
    {
      coinMinimalDenom: 'ibc/A921F94469C4A81C0F5766264384AE2620B2B0449C7217162A4636EC2CE01E52',
      coinDenom: 'DOT',
      coinDecimals: 10,
    },
  ],
};

export { CryptoOrgChainMainnet_1 };
