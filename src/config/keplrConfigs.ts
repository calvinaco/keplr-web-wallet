import { ChainInfo } from '@keplr-wallet/types';
import { ChainSource } from '../apptypes.d';
import chainList from './chains';

const KeplrConfigs = chainList.reduce<{
  [chainId: string]: ChainInfo;
}>((keplrConfigs, chain) => {
  if (chain.chain.source === ChainSource.AppDefault) {
    keplrConfigs[chain.chain.id] = chain.keplrChainInfo!;
  }
  return keplrConfigs;
}, {});

export default KeplrConfigs;
