import { Coin } from '../apptypes.d';
import axios from 'axios';

const getAccountCoinList = async (lcdBaseURL: string, address: string): Promise<Coin[]> => {
  const coinList: Coin[] = [];
  const limit = 20;
  let page = 0;
  while (true) {
    const bankBalanceList = await getBankBalanceList(lcdBaseURL, address, limit, page * limit);
    for (const bankBalance of bankBalanceList) {
      let humanReadableDenom = bankBalance.denom;
      if (bankBalance.denom.startsWith('ibc/')) {
        humanReadableDenom = await getIBCDenomTraces(lcdBaseURL, bankBalance.denom);
      }
      const coin: Coin = {
        denom: bankBalance.denom,
        amount: bankBalance.amount,
        humanReadableDenom,
        humanReadableAmount: bankBalance.amount,
      };
      coinList.push(coin);
    }

    if (bankBalanceList.length < limit) {
      break;
    }
    page += 1;
  }

  return coinList;
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
  return `${resp.data.denom_trace.path}/${resp.data.denom_trace.base_denom}`;
};

type BankBalance = {
  amount: string;
  denom: string;
};

export { getAccountCoinList };
