import { styled } from '@mui/system';
import React from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import WalletAppStateEffect from './StateEffect';
import WalletMain from '../WalletMain';
import Layout from './Layout';

const Container = styled('div')({
  borderRadius: 4,
  backgroundColor: '#fff',
});

function WalletApp() {
  const location = useLocation();
  const navigate = useNavigate();
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
