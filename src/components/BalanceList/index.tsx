import { Denom, TokenBalance } from '../../apptypes.d';

function BalanceList(props: BalanceListProps) {
  return (
    <div />
  );
}

export type BalanceListProps = {
  balances: TokenBalance[],
  onStartTransfer: (denom: Denom) => void,
}

export default BalanceList;
