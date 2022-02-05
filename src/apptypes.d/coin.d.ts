export type Denom = string;

export type Coin = {
  denom: string;
  amount: string;
  humanReadableDenom: string;
  humanReadableAmount: string;
};

export type Currency = {
  coinMinimalDenom: string;
  coinDenom: string;
  coinDecimals: number;
  alwaysDisplay?: boolean;
};
