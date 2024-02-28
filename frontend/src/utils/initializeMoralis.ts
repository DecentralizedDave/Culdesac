import Moralis from 'moralis';

let isMoralisStarted = false;

export const initializeMoralis = async () => {
  if (!isMoralisStarted) {
    await Moralis.start({
      apiKey: import.meta.env.VITE_APP_MORALIS_API,
      // include other necessary configuration options here
    });
    isMoralisStarted = true;
  }
};
