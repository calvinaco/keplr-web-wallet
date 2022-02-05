import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import './App.css';
import WalletApp from './containers/WalletApp';

const AppViewport = styled((props: { children: React.ReactNode }) => (
  <Container maxWidth="md">
    <Box
      sx={{
        height: '100vh',
      }}>
      {props.children}
    </Box>
  </Container>
))({
  backgroundColor: '#f8f9fe',
});

function App() {
  const { enqueueSnackbar } = useSnackbar();
  const isKeplrInstalled = !!window.keplr;

  useEffect(() => {
    if (!isKeplrInstalled) {
      enqueueSnackbar('Keplr not installed!', {
        variant: 'error',
      });
    }
  }, []);

  return (
    <div className="App">
      <CssBaseline />
      <AppViewport>{isKeplrInstalled ? <WalletApp /> : <KeplrNotInstalled />}</AppViewport>
    </div>
  );
}

function KeplrNotInstalled() {
  return (
    <Box sx={{ padding: '15px' }}>
      <Typography>
        Keplr not installed! Please install{' '}
        <a
          href="https://chrome.google.com/webstore/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap"
          target="_blank"
          rel="noopener noreferrer">
          Keplr
        </a>{' '}
        and refresh this page.
      </Typography>
      <Button variant="contained" onClick={() => window.location.reload()}>
        Refresh
      </Button>
    </Box>
  );
}

export default App;
