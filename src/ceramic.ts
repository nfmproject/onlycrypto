import { EthereumAuthProvider, ThreeIdConnect } from '@3id/connect';
import CeramicClient from '@ceramicnetwork/http-client';
import { DID } from 'dids';
import KeyDidResolver from 'key-did-resolver';
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver';
import { useRecoilState } from 'recoil';
import { AuthStatus, basicAuthState } from './state/authStates';

const ceramic = new CeramicClient('https://ceramic-clay.3boxlabs.com');

export default function CeramicAuth() {
  const [authState, setAuthState] = useRecoilState(basicAuthState);

  /**
   * Authenticates ceramic using 3id
   * @returns null
   */
  const authenticate = async () => {
    switch (authState) {
      case AuthStatus.PENDING:
        setAuthState(AuthStatus.LOADING);
        const addresses = await window.ethereum.enable();
        const threeIdConnect = new ThreeIdConnect();
        const authProvider = new EthereumAuthProvider(window.ethereum, addresses[0]);
        await threeIdConnect.connect(authProvider);
        const provider = await threeIdConnect.getDidProvider();

        const resolver = {
          ...KeyDidResolver.getResolver(),
          ...ThreeIdResolver.getResolver(ceramic),
        };
        const did = new DID({ resolver });
        ceramic.did = did;

        ceramic.did.setProvider(provider);
        ceramic.did
          .authenticate()
          .then((res) => {
            setAuthState(AuthStatus.AUTHENTICATED);
          })
          .catch(() => {
            alert('AuthFailed!!!');
            setAuthState(AuthStatus.FAILED);
          });
        return;
      case AuthStatus.LOADING:
        // TODO : modal to keep
        alert('please wait!!!');
        return;
      case AuthStatus.AUTHENTICATED:
        alert('Already been authenticated 🎉 ');
        return;
      default:
        return;
    }
  };
  /**
   * sets Auth state to pending
   */
  const resetDid = async () => {
    setAuthState(AuthStatus.PENDING);
  };

  return {
    authenticate,
    resetDid,
    authState,
  };
}
