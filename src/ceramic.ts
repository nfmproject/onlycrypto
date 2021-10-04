import { ThreeIdConnect, EthereumAuthProvider } from '@3id/connect';
import CeramicClient from '@ceramicnetwork/http-client';
import { DID } from 'dids';
import KeyDidResolver from 'key-did-resolver';
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver';
import { useRecoilState } from 'recoil';
import { basicAuthState } from './state/authStates/basicAuth';

const ceramic = new CeramicClient('https://ceramic-clay.3boxlabs.com');

export default function CeramicAuth() {
  const [authState, setAuthState] = useRecoilState(basicAuthState);

  /**
   * Authenticates ceramic using 3id
   * @returns null
   */
  const authenticate = async () => {
    switch (authState) {
      case 'pending':
        setAuthState('loading');
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
            setAuthState('done');
          })
          .catch(() => {
            alert('AuthFailed!!!');
            setAuthState('failed');
          });
        return;
      case 'loading':
        // TODO : modal to keep
        alert('please wait!!!');
        return;
      case 'done':
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
    setAuthState('pending');
  };

  return {
    authenticate,
    resetDid,
    authState,
  };
}
