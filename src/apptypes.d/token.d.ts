export type Amount = string;

export type Denom = string;

export type TokenBalance = {
  denom: Denom;
  humanReadableDenom: string;
  amount: Amount;
};
