import WalletHeader from '../WalletHeader';
import { Typography } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

function WalletAppLayout(props: WalletAppLayoutProps) {
  return (
    <React.Fragment>
      <WalletHeader />
      <Outlet />
      <Typography sx={{ marginTop: '20px' }} textTransform="none" fontSize="15px" textAlign="left">
        WARNING: This software is provided without warranty of any kind. Use it at your own risk and
        in no event shall the authors be liable for any claim, damages or other liability arising
        from the software.
      </Typography>
    </React.Fragment>
  );
}

export type WalletAppLayoutProps = {};

export default WalletAppLayout;
