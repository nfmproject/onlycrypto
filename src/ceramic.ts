import { EthereumAuthProvider, ThreeIdConnect } from '@3id/connect';
import CeramicClient from '@ceramicnetwork/http-client';
import { DID } from 'dids';
import KeyDidResolver from 'key-did-resolver';
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver';
import { useRecoilState } from 'recoil';
import { AuthStatus, basicAuthState } from './state/authStates';
import { TileDocument } from '@ceramicnetwork/stream-tile'
import { ceramicState, CeramicStatus } from './state/CeramicStates';

const ceramic = new CeramicClient('https://ceramic-clay.3boxlabs.com');


// TODO : Ceramic breaks without persmissions, wrap into try catch

export default function CeramicAuth() {
  const [authState, setAuthState] = useRecoilState(basicAuthState);
  const [getCeramicState, setCeramicState] = useRecoilState(ceramicState)

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

  /**
   * createData
   * @returns document id
   */

  const createData = async () => {
    console.log(ceramic.did?.id)
    if (!!ceramic.did?.id && getCeramicState != 'IDLE') {
      const doc = await TileDocument.create(
        ceramic,
        { "lauda": 'lassan' },
        {
          controllers: [ceramic.did.id],
          family: 'doc family',
          schema: "k3y52l7qbv1frxt706gqfzmq6cbqdkptzk8uudaryhlkf6ly9vx21hqu4r6k1jqio",  // TODO : fix and set schema
        },
        { pin: true }
      )
      console.log(doc.id.toString())
      return doc
    } else {
      console.log("no ceramic did or busy")
      return "error"
    }
  }

  /**
   * 
   * @returns Content 
   */

  const readData = async () => {
    if (!!ceramic.did?.id && getCeramicState != 'IDLE') {
      const streamId = 'kjzl6cwe1jw145lb9e5lwoldsauexwj573igblemxbzzbu0cqyniukqc0h10h8h'
      const doc = await TileDocument.load(ceramic, streamId)
      console.log(doc.content)
      return doc.content
    } else {
      console.log("no ceramic did or busy")
      return "error"
    }
  }

  /**
   * Update the existing data on ceramic server
   * @returns Document Updated
   */
  const updateData = async () => {
    if (!!ceramic.did?.id && getCeramicState != 'IDLE') {
      const streamId = 'kjzl6cwe1jw145lb9e5lwoldsauexwj573igblemxbzzbu0cqyniukqc0h10h8h'
      const doc = await TileDocument.load(ceramic, streamId)
      await doc.update({ foo: 'baz' })
      return doc
    } else {
      console.log("no ceramic did or busy")
      return "error"
    }

  }

  return {
    authenticate,
    resetDid,
    createData,
    readData,
    updateData,
    authState,
  };
}
