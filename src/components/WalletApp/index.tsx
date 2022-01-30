import React from "react";
import { styled } from '@mui/system';
import WalletHeader from "../WalletHeader";

const Container = styled('div')({
  borderRadius: 4,
  backgroundColor: '#fff',
});

function WalletApp() {
  return (
    <React.Fragment>
      <WalletHeader />
      <Container>
      </Container>
    </React.Fragment>
  );
}

export default WalletApp;
