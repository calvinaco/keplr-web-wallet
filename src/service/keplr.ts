import { ChainInfo } from '@keplr-wallet/types';

const addChainToKeplr = async (chainConfig: ChainInfo) => {
  if (!window.keplr || !('experimentalSuggestChain' in window.keplr)) {
    throw new Error(
      'Keplr does not support adding custom network. Please update to the latest version.',
    );
  }
  // Keplr v0.6.4 introduces an experimental feature that supports the feature to suggests the chain from a webpage.
  // cosmoshub-3 is integrated to Keplr so the code should return without errors.
  // The code below is not needed for cosmoshub-3, but may be helpful if you’re adding a custom chain.
  // If the user approves, the chain will be added to the user's Keplr extension.
  // If the user rejects it or the suggested chain information doesn't include the required fields, it will throw an error.
  // If the same chain id is already registered, it will resolve and not require the user interactions.
  await window.keplr!.experimentalSuggestChain(chainConfig);
};

export { addChainToKeplr };
