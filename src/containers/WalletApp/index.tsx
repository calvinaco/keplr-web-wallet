import WalletMain from '../WalletMain';
import Layout from './Layout';
import WalletAppStateEffect from './StateEffect';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

function WalletApp() {
  return (
    <React.Fragment>
      <WalletAppStateEffect />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<WalletMain />} />
        </Route>
      </Routes>
    </React.Fragment>
  );
}

export default WalletApp;
