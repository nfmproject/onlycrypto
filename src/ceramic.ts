import { EthereumAuthProvider, ThreeIdConnect } from '@3id/connect';
import CeramicClient from '@ceramicnetwork/http-client';
import { DID } from 'dids';
import KeyDidResolver from 'key-did-resolver';
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Fortmatic from 'fortmatic';
import Torus from '@toruslabs/torus-embed';
import Web3 from 'web3';
import { useRecoilState } from 'recoil';
import { AuthStatus, basicAuthState } from './state/authStates';
import { TileDocument } from '@ceramicnetwork/stream-tile';
import { ceramicState, CeramicStatus } from './state/CeramicStates';

const ceramic = new CeramicClient('https://ceramic-clay.3boxlabs.com');

// TODO : Ceramic breaks without persmissions, wrap into try catch
export interface CeramicType {
  authenticate: () => Promise<boolean>;
  resetDid: () => Promise<void>;
  createData: (data: object, schema?: string | undefined) => Promise<string>;
  readData: (streamId: string) => Promise<any>;
  updateData: (streamId: string, data: object) => Promise<any>;
  createJWS: (payload: string) => Promise<object>;
  authState: AuthStatus;
  logoutOfWeb3Modal: () => Promise<void>;
}

/*
   Web3 modal helps us "connect" external wallets:
 */
const web3Modal = new Web3Modal({
  network: 'mainnet', // optional
  cacheProvider: true, // optional
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: '19b2294ebe0247a5a7beb92164520320', // nft-market infura id
      },
    },
    fortmatic: {
      package: Fortmatic,
      options: {
        // Mikko's TESTNET api key
        key: 'pk_test_391E26A3B43A3350',
      },
    },
    torus: {
      package: Torus,
    },
  },
});

export default function CeramicAuth() {
  const [authState, setAuthState] = useRecoilState(basicAuthState);
  const [getCeramicState, setCeramicState] = useRecoilState(ceramicState);

  /**
   * Logout for web3
   */
  const logoutOfWeb3Modal = async () => {
    await web3Modal.clearCachedProvider();
    localStorage.clear();
    setAuthState(AuthStatus.PENDING);
    setTimeout(() => {
      window.location.reload();
    }, 1);
  };

  /**
   * Authenticates ceramic using 3id
   * @returns null
   */
  const authenticate = async () => {
    switch (authState) {
      case AuthStatus.SOFT:
      case AuthStatus.PENDING:
        setAuthState(AuthStatus.LOADING);

        const web3modalProvider = await web3Modal.connect();
        const web3 = new Web3(web3modalProvider);

        const threeIdConnect = new ThreeIdConnect();
        const temp = new Web3(web3.currentProvider);
        const addresses = await temp.eth.getAccounts();
        const authProvider = new EthereumAuthProvider(web3.currentProvider, addresses[0]);
        await threeIdConnect.connect(authProvider);
        const provider = await threeIdConnect.getDidProvider();

        const resolver = {
          ...KeyDidResolver.getResolver(),
          ...ThreeIdResolver.getResolver(ceramic),
        };
        const did = new DID({ resolver });
        ceramic.did = did;

        ceramic.did.setProvider(provider);
        const authed = await ceramic.did.authenticate();

        if (!!authed) {
          if (ceramic.did.authenticated) {
            localStorage.setItem('user_did', ceramic.did?.id || '');
            setAuthState(AuthStatus.AUTHENTICATED);
          } else {
            alert('AuthFailed!!!');
            setAuthState(AuthStatus.FAILED);
          }
        }
        return ceramic.did.authenticated;
      case AuthStatus.LOADING:
        // TODO : modal to keep
        alert('please wait!!!');
        return false;
      case AuthStatus.AUTHENTICATED:
        alert('Already been authenticated 🎉 ');
        return false;
      default:
        return false;
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
  const createData = async (data: object, schema?: string, tagsData?: Array<string>) => {
    if (!!ceramic.did?.id && getCeramicState != 'IDLE') {
      const doc = await TileDocument.create(
        ceramic,
        data,
        {
          controllers: [ceramic.did.id],
          family: 'doc family',
          schema: schema, // TODO : fix and set schema
          tags: tagsData,
        },
        { pin: true },
      );
      console.log(doc.id.toString());
      return doc.id.toString();
    } else {
      console.log('no ceramic did or busy');
      return 'error';
    }
  };

  /**
   * read data from ceramic
   * @returns Content
   */
  const readData = async (streamId: string) => {
    if (!!ceramic.did?.id && getCeramicState != 'IDLE') {
      const doc = await TileDocument.load(ceramic, streamId);
      if (doc.content) return JSON.stringify(doc.content);
      else return 'error';
    } else {
      console.log('no ceramic did or busy');
      return 'error';
    }
  };

  /**
   * Update the existing data on ceramic server
   * @returns Document Updated
   */
  const updateData = async (streamId: string, data: object) => {
    if (!!ceramic.did?.id && getCeramicState != 'IDLE') {
      const doc = await TileDocument.load(ceramic, streamId);
      if (doc.metadata.controllers.includes(ceramic.did.id)) {
        await doc.update(data);
        return doc;
      } else {
        console.error('no write access');
        return { error: 'no write access' };
      }
    } else {
      console.error('no ceramic did or busy');
      return 'error';
    }
  };

  const createJWS = async (payload: string) => {
    if (!!ceramic.did?.id && getCeramicState != 'IDLE') {
      const token = await ceramic.did.createJWS(payload);
      return { payload: token.payload, signatures: token.signatures };
    } else {
      console.error('no ceramic did or busy');
      return { error: 'Authenticate first' };
    }
  };

  return {
    authenticate,
    logoutOfWeb3Modal,
    resetDid,
    createData,
    readData,
    updateData,
    createJWS,
    authState,
  };
}
