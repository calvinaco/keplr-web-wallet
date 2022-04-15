import './App.css';
import WalletApp from './containers/WalletApp';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';

const oneSecond = 1000;

function AppViewport(props: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        backgroundColor: '#f8f9fe',
      }}>
      <Container maxWidth="md">
        <Box
          sx={{
            height: '100vh',
          }}>
          {props.children}
        </Box>
      </Container>
    </Box>
  );
}

function App() {
  const { enqueueSnackbar } = useSnackbar();
  const [isKeplrInstalled, setIsKeplrInstalled] = useState(window.keplr !== undefined);

  useEffect(() => {
    if (isKeplrInstalled) {
      return;
    }
    // Sometimes window.keplr is not available immediately when tab refreshes.
    let nextTimeout = 100;
    const setNextTimeout = () =>
      setTimeout(() => {
        if (window.keplr !== undefined) {
          setIsKeplrInstalled(true);
        } else {
          nextTimeout = Math.max(nextTimeout * 2, oneSecond);
          const hasTriedForAWhile = nextTimeout === oneSecond;
          if (hasTriedForAWhile) {
            enqueueSnackbar('Keplr not installed!', {
              variant: 'error',
              preventDuplicate: true,
            });
          }
          setNextTimeout();
        }
      }, nextTimeout);
    setNextTimeout();
  }, [enqueueSnackbar, isKeplrInstalled]);

  console.log(isKeplrInstalled);
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
        Keplr not detected! Please install{' '}
        <a
          href="https://chrome.google.com/webstore/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap"
          target="_blank"
          rel="noopener noreferrer">
          Keplr
        </a>{' '}
        and refresh this page.
      </Typography>
      <Typography>It may need a while before your Keplr installation is detected.</Typography>
      <Button variant="contained" onClick={() => window.location.reload()}>
        Refresh
      </Button>
    </Box>
  );
}

export default App;
