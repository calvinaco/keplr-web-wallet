import { ChainNetwork, ChainSource } from '../../apptypes.d';
import { ChainConfig } from '../types';

const CryptoOrgChainMainnet_1: ChainConfig = {
  chain: {
    id: 'crypto-org-chain-mainnet-1',
    name: 'Crypto.org Chain',
    network: ChainNetwork.Mainnet,
    source: ChainSource.KeplrDefault,
    addressBech32Prefix: 'cro',
    rpcBaseURLs: {
      tendermint: 'https://mainnet.crypto.org:26657',
      lcd: 'https://mainnet.crypto.org:1317',
    },
    explorerURLs: {
      account: 'https://crypto.org/explorer/account/{account}',
      transaction: 'https://crypto.org/explorer/tx/{transaction}',
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
      {
        coinMinimalDenom: 'ibc/401E8BFB2B898C62A272A77F721A04A2345E3A4D93F69E467B7C98A9CF998FEE',
        coinDenom: 'ADA',
        coinDecimals: 6,
      },
    ],
  },
  ibcChannelList: [
    {
      destinationChainId: 'cronosmainnet_25-1',
      label: 'Cronos Bridge',
      channelId: 'channel-44',
    },
  ],
};

export default CryptoOrgChainMainnet_1;
