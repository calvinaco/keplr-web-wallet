export type Wallet = {
  name: string;
  type: WalletType;
  address: string;
};

export enum WalletType {
  Local = 'Local',
  Ledger = 'Ledger',
}
