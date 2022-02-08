import { Currency } from './coin';

export type Chain = {
  id: string;
  name: string;
  network?: ChainNetwork;
  source: ChainSource;
  rpcBaseURLs: {
    tendermint: string;
    lcd: string;
  };
  explorerURLs: {
    account: string;
    transaction: string;
  };
  currencyList: Currency[];
};

export enum ChainSource {
  KeplrDefault = 'keplrDefault',
  AppDefault = 'AppDefault',
  Custom = 'Custom',
}

export enum ChainNetwork {
  Mainnet = 'Mainnet',
  Testnet = 'Testnet',
  Local = 'Local',
}
