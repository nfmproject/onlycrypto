import { ThreeIdConnect,  EthereumAuthProvider } from '@3id/connect'
import CeramicClient from '@ceramicnetwork/http-client'
import { DID } from 'dids'
import KeyDidResolver from 'key-did-resolver'
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver'



declare const window : any;


const ceramic = new CeramicClient("https://ceramic-clay.3boxlabs.com")

export default async function ceramicAuth(){
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
    await ceramic.did.authenticate()
    return ceramic

}
