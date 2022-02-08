import { ChainInfo } from '@keplr-wallet/types';
import { Chain, IBCSourceChainChannel } from '../apptypes.d';

export type ChainConfig = {
  chain: Chain;
  ibcChannelList: IBCSourceChainChannel[];
  // Optional Keplr ChainInfo if the chain is not a default Keplr supported chain
  keplrChainInfo?: ChainInfo;
};
