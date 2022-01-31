import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { styled } from '@mui/system';
import { ContainerProps } from '@mui/material';
import WalletApp from './components/WalletApp';
import './App.css';

const AppViewport = styled((props: { children: React.ReactNode }) => (
  <Container maxWidth="md">
    <Box sx={{ height: '100vh' }}>
      {props.children}
    </Box>
  </Container>
))({
  backgroundColor: '#fafbfd',
})

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <AppViewport>
        <WalletApp />
      </AppViewport>
    </div>
  );
}

export default App;
