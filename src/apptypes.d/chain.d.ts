import { Currency } from './coin';

export type Chain = {
  id: ChainId;
  name: string;
  network?: ChainNetwork;
  source: ChainSource;
  rpcBaseURLs: {
    lcd: string;
  };
};

export type ChainConfig = Chain & {
  currencyList: Currency[];
};

export type ChainId = string;

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
