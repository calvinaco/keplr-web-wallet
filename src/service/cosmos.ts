import axios from 'axios';
import { TokenBalance } from '../apptypes.d';

const getAccountTokenBalanceList = async (
  lcdBaseURL: string,
  address: string,
): Promise<TokenBalance[]> => {
  const tokenBalanceList: TokenBalance[] = [];
  const limit = 20;
  let page = 0;
  while (true) {
    const bankBalances = await getBankBalanceList(lcdBaseURL, address, limit, page * limit);
    for (const bankBalance of bankBalances) {
      let humanReadableDenom = bankBalance.denom;
      if (bankBalance.denom.startsWith('ibc/')) {
        humanReadableDenom = await getIBCDenomTraces(lcdBaseURL, bankBalance.denom);
      }
      const tokenBalance: TokenBalance = {
        denom: bankBalance.denom,
        humanReadableDenom,
        amount: bankBalance.amount,
      };
      tokenBalanceList.push(tokenBalance);
    }

    if (bankBalances.length < limit) {
      break;
    }
    page += 1;
  }

  return tokenBalanceList;
};

const getBankBalanceList = async (
  lcdBaseURL: string,
  address: string,
  limit: number,
  offset: number,
): Promise<BankBalance[]> => {
  const resp = await axios.get(
    `${lcdBaseURL}/cosmos/bank/v1beta1/balances/${address}?pagination.limit=${limit.toString()}&pagination.offset=${offset.toString()}`,
  );
  return resp.data.balances;
};

const getIBCDenomTraces = async (lcdBaseURL: string, denom: string): Promise<string> => {
  const resp = await axios.get(`${lcdBaseURL}/ibc/apps/transfer/v1/denom_traces/${denom.slice(4)}`);
  return `${resp.data.path}/${resp.data.base_denom}`;
};

type BankBalance = {
  amount: string;
  denom: string;
};

export { getAccountTokenBalanceList };
