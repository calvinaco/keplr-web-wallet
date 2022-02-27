import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Button from '@mui/material/Button';
import { SnackbarKey, SnackbarProvider } from 'notistack';
import React, { ErrorInfo } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

class ErrorBoundary extends React.Component<{}, { hasError: boolean }> {
  constructor(props: {}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {}

  render() {
    if (this.state.hasError) {
      return <span>Sorry! Something went wrong. Refresh this page and try again.</span>;
    }

    return this.props.children;
  }
}

function AppSnackbarProvider(props: { children: React.ReactNode }) {
  const notistackRef = React.createRef<SnackbarProvider>();
  const onClickDismiss = (key: SnackbarKey) => () => {
    notistackRef.current!.closeSnackbar(key);
  };

  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      ref={notistackRef}
      action={(key) => (
        <Button sx={{ color: '#fff' }} onClick={onClickDismiss(key)}>
          Dismiss
        </Button>
      )}>
      {props.children}
    </SnackbarProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <Router basename={process.env.PUBLIC_URL}>
        <AppSnackbarProvider>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </AppSnackbarProvider>
      </Router>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
