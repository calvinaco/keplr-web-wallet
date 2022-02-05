import { ChainConfig } from '../apptypes.d';
import { CronosMainnet25_1 } from './chains/cronos-mainnet-25-1';
import { CryptoOrgChainMainnet_1 } from './chains/crypto-org-chain-mainnet-1';

const defaultChainList: ChainConfig[] = [CryptoOrgChainMainnet_1, CronosMainnet25_1];

export default defaultChainList;
