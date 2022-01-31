import React from 'react';
import { useRecoilState } from 'recoil';
import { currentNetworkAtom } from '@recoil/currentNetworkl';

function WalletHeaderNetworkSelector() {
  const currentNetwork = useRecoilState(currentNetworkAtom);

}