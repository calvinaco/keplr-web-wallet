import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Button, { ButtonProps } from '@mui/material/Button';
import React, { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import isPendingToConnectKeplrAtom from '../../recoil/isPendingToConnectKeplr';

function ConnectKeplrButton(props: ButtonProps) {
  const [isPendingToConnectKeplr, setIsPendingToConnectKeplr] = useRecoilState(
    isPendingToConnectKeplrAtom,
  );

  const handleClick = useCallback(() => {
    setIsPendingToConnectKeplr(true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Button
      startIcon={<AccountBalanceWalletIcon />}
      variant="contained"
      disabled={isPendingToConnectKeplr}
      onClick={handleClick}
      {...props}>
      {isPendingToConnectKeplr ? 'Connecting Keplr...' : 'Connect Keplr'}
    </Button>
  );
}

export default ConnectKeplrButton;
