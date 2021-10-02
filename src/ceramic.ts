import { ThreeIdConnect, EthereumAuthProvider } from '@3id/connect'
import CeramicClient from '@ceramicnetwork/http-client'
import { DID } from 'dids'
import KeyDidResolver from 'key-did-resolver'
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver'
import { useReducer } from 'react'
import { createContext } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { basicAuthState } from './state/authStates/basicAuth'



declare const window: any;


const ceramic = new CeramicClient("https://ceramic-clay.3boxlabs.com")

export default function CeramicAuth() {

  const [authState, setAuthState] = useRecoilState(basicAuthState)
  
  const authenticate = async () => {
    const addresses = await window.ethereum.enable()
    const threeIdConnect = new ThreeIdConnect()
    const authProvider = new EthereumAuthProvider(window.ethereum, addresses[0])
    await threeIdConnect.connect(authProvider)
    const provider = await threeIdConnect.getDidProvider()

    const resolver = {
      ...KeyDidResolver.getResolver(),
      ...ThreeIdResolver.getResolver(ceramic),
    }
    const did = new DID({ resolver })
    ceramic.did = did

    ceramic.did.setProvider(provider)
    ceramic.did.authenticate().then(() => {
      setAuthState(JSON.stringify(ceramic.did?.id))
    })
    window.ceramic = ceramic
  }
  const resetDid = async () => {
    setAuthState( "test" + JSON.stringify(ceramic.did?.id))
  }
  return {
    authenticate,
    resetDid,
    authState
  }

}
