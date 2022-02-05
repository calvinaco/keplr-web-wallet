import { ChainInfo } from '@keplr-wallet/types';
import { CronosMainnet25_1KeplrChainConfig } from './chains/cronos-mainnet-25-1';

const KeplrConfigs: {
  [chainId: string]: ChainInfo;
} = {
  [CronosMainnet25_1KeplrChainConfig.chainId]: CronosMainnet25_1KeplrChainConfig,
};

export default KeplrConfigs;
