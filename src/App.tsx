import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { styled } from '@mui/system';
import { ContainerProps } from '@mui/material';
import WalletApp from './components/WalletApp';
import './App.css';

const AppContainer = styled((props: ContainerProps) => <Container {...props} />)({
  backgroundColor: '#fafbfd',
})

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <AppContainer maxWidth="md">
        <Box sx={{ height: '100vh' }}>
          <WalletApp />
        </Box>
      </AppContainer>
    </div>
  );
}

export default App;
