import { Typography } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';
import { useRecoilValue } from 'recoil';
import WalletAddressLabel from '../../components/WalletAddressLabel';
import currentWalletAtom from '../../recoil/currentWallet';
import ConnectKeplrButton from '../ConnectKeplrButton';

const Container = styled('div')({
  borderRadius: 4,
  backgroundColor: '#fff',
});

function WalletMain(props: WalletMainProps) {
  const currentWallet = useRecoilValue(currentWalletAtom);

  if (currentWallet === null) {
    return <ConnectKeplrButton />;
  }

  return (
    <Container>
      <Typography fontSize="25px">{currentWallet.name}</Typography>
      <WalletAddressLabel address={currentWallet.address} copyable />
    </Container>
  );
}

export type WalletMainProps = {};

export default WalletMain;
