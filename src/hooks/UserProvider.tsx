import { Web3Provider } from '@ethersproject/providers';
import { useMemo } from 'react';
import { INFURA_ID } from '../constants';

/*
  ~ What it does? ~

  Gets user provider

  ~ How can I use? ~

  const userProvider = useUserProvider(injectedProvider, localProvider);

  ~ Features ~

  - Specify the injected provider from Metamask
  - Specify the local provider
  - Usage examples:
    const address = useUserAddress(userProvider);
    const tx = Transactor(userProvider, gasPrice)
*/

const useUserProvider = (injectedProvider: any, localProvider: any) => useMemo(() => {
  if (injectedProvider) {
    console.log('🦊 Using injected provider');
    return injectedProvider;
  }
  if (!localProvider) return undefined;


  if (window.location.pathname) {
    if (window.location.pathname.indexOf('/pk') >= 0) {
      const incomingPK = window.location.hash.replace('#', '');
      let rawPK;
      if (incomingPK.length === 64 || incomingPK.length === 66) {
        console.log('🔑 Incoming Private Key...');
        rawPK = incomingPK;
        window.history.pushState({}, '', '/');
        const currentPrivateKey = window.localStorage.getItem('metaPrivateKey');
        if (currentPrivateKey && currentPrivateKey !== rawPK) {
          window.localStorage.setItem('metaPrivateKey_backup' + Date.now(), currentPrivateKey);
        }
        window.localStorage.setItem('metaPrivateKey', rawPK);
      }
    }
  }

}, [injectedProvider, localProvider]);

export default useUserProvider;
