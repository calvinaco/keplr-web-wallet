import BalanceList from '../../components/BalanceList';
import WalletAddressLabel from '../../components/WalletAddressLabel';
import { allBalanceOfSelector } from '../../recoil/balanceOf';
import currentWalletAtom from '../../recoil/currentWallet';
import ConnectKeplrButton from '../ConnectKeplrButton';
import Transfer from '../Transfer';
import { Typography } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';
import { useRecoilValue } from 'recoil';

const Container = styled('div')({
  borderRadius: 4,
  backgroundColor: '#fff',
});

function WalletMain(props: WalletMainProps) {
  const currentWallet = useRecoilValue(currentWalletAtom);
  const allBalanceOf = useRecoilValue(allBalanceOfSelector);

  if (currentWallet === null) {
    return <ConnectKeplrButton />;
  }

  return (
    <Container>
      <Typography fontSize="25px">{currentWallet.name}</Typography>
      <WalletAddressLabel address={currentWallet.address} copyable />
      <Transfer denom="basecro" />
      <BalanceList balances={allBalanceOf} onStartTransfer={() => {}} />
    </Container>
  );
}

export type WalletMainProps = {};

export default WalletMain;
