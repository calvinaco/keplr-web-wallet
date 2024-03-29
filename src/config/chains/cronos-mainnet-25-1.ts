import { ChainNetwork, ChainSource } from '../../apptypes.d';
import { ChainConfig } from '../types';

const CronosMainnet25_1: ChainConfig = {
  chain: {
    id: 'cronosmainnet_25-1',
    name: 'Cronos',
    network: ChainNetwork.Mainnet,
    source: ChainSource.AppDefault,
    addressBech32Prefix: 'crc',
    rpcBaseURLs: {
      tendermint: 'https://rpc.cronos.org',
      lcd: 'https://rest.cronos.org',
    },
    explorerURLs: {
      account: 'https://cronoscan.com/address/{account}',
      transaction: 'https://rest.cronos.org/cosmos/tx/v1beta1/txs/{transaction}',
    },
    currencyList: [
      {
        coinMinimalDenom: 'basecro',
        coinDenom: 'CRO',
        coinDecimals: 18,
        alwaysDisplay: true,
      },
    ],
  },
  ibcChannelList: [
    {
      destinationChainId: 'crypto-org-chain-mainnet-1',
      channelId: 'channel-0',
      label: 'Cronos Bridge',
    },
  ],
  keplrChainInfo: {
    // Chain-id of the Cosmos SDK chain.
    chainId: 'cronosmainnet_25-1',
    // The name of the chain to be displayed to the user.
    chainName: 'Cronos',
    // RPC endpoint of the chain.
    rpc: 'https://rpc.cronos.org',
    // REST endpoint of the chain.
    rest: 'https://rest.cronos.org',
    // Staking coin information
    stakeCurrency: {
      // Coin denomination to be displayed to the user.
      coinDenom: 'CRO',
      // Actual denom (i.e. uatom, uscrt) used by the blockchain.
      coinMinimalDenom: 'basecro',
      // # of decimal points to convert minimal denomination to user-facing denomination.
      coinDecimals: 18,
      // (Optional) Keplr can show the fiat value of the coin if a coingecko id is provided.
      // You can get id from https://api.coingecko.com/api/v3/coins/list if it is listed.
      coinGeckoId: 'crypto-com-chain',
    },
    // (Optional) If you have a wallet webpage used to stake the coin then provide the url to the website in `walletUrlForStaking`.
    // The 'stake' button in Keplr extension will link to the webpage.
    // walletUrlForStaking: "",
    // The BIP44 path.
    bip44: {
      // You can only set the coin type of BIP44.
      // 'Purpose' is fixed to 44.
      coinType: 60,
    },
    // Bech32 configuration to show the address to user.
    // This field is the interface of
    // {
    //   bech32PrefixAccAddr: string;
    //   bech32PrefixAccPub: string;
    //   bech32PrefixValAddr: string;
    //   bech32PrefixValPub: string;
    //   bech32PrefixConsAddr: string;
    //   bech32PrefixConsPub: string;
    // }
    bech32Config: {
      bech32PrefixAccAddr: 'crc',
      bech32PrefixAccPub: 'crcpub',
      bech32PrefixValAddr: 'crcvaloper',
      bech32PrefixValPub: 'crcvaloperpub',
      bech32PrefixConsAddr: 'crcvalcons',
      bech32PrefixConsPub: 'crcvalconspub',
    },
    // List of all coin/tokens used in this chain.
    currencies: [
      {
        // Coin denomination to be displayed to the user.
        coinDenom: 'CRO',
        // Actual denom (i.e. uatom, uscrt) used by the blockchain.
        coinMinimalDenom: 'basecro',
        // # of decimal points to convert minimal denomination to user-facing denomination.
        coinDecimals: 18,
        // (Optional) Keplr can show the fiat value of the coin if a coingecko id is provided.
        // You can get id from https://api.coingecko.com/api/v3/coins/list if it is listed.
        coinGeckoId: 'crypto-com-chain',
      },
    ],
    // List of coin/tokens used as a fee token in this chain.
    feeCurrencies: [
      {
        // Coin denomination to be displayed to the user.
        coinDenom: 'CRO',
        // Actual denom (i.e. uatom, uscrt) used by the blockchain.
        coinMinimalDenom: 'basecro',
        // # of decimal points to convert minimal denomination to user-facing denomination.
        coinDecimals: 18,
        // (Optional) Keplr can show the fiat value of the coin if a coingecko id is provided.
        // You can get id from https://api.coingecko.com/api/v3/coins/list if it is listed.
        coinGeckoId: 'crypto-com-chain',
      },
    ],
    // (Optional) The number of the coin type.
    // This field is only used to fetch the address from ENS.
    // Ideally, it is recommended to be the same with BIP44 path's coin type.
    // However, some early chains may choose to use the Cosmos Hub BIP44 path of '118'.
    // So, this is separated to support such chains.
    coinType: 60,
    // (Optional) This is used to set the fee of the transaction.
    // If this field is not provided, Keplr extension will set the default gas price as (low: 0.01, average: 0.025, high: 0.04).
    // Currently, Keplr doesn't support dynamic calculation of the gas prices based on on-chain data.
    // Make sure that the gas prices are higher than the minimum gas prices accepted by chain validators and RPC/REST endpoint.
    gasPriceStep: {
      low: 5000000000000,
      average: 5000000000000,
      high: 5000000000000,
    },
    features: ['stargate', 'ibc-transfer'],
  },
};

export default CronosMainnet25_1;
