import React from 'react';
import { Outlet } from 'react-router-dom';
import WalletHeader from '../WalletHeader';

function WalletAppLayout(props: WalletAppLayoutProps) {
  return (
    <React.Fragment>
      <WalletHeader />
      <Outlet />
    </React.Fragment>
  );
}

export type WalletAppLayoutProps = {};

export default WalletAppLayout;
