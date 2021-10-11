import Ceramic from '@ceramicnetwork/http-client'
import { IDX } from '@ceramicstudio/idx'
import { Ed25519Provider } from 'key-did-provider-ed25519'
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver';
import KeyDidResolver from 'key-did-resolver';
import { Resolver } from 'did-resolver';
import { DID } from 'dids';

const CERAMIC_URL = 'http://localhost:7007'


const definitions = {
    posts: '',
}

export type PostItem = {
    id: string
    title: string
}

export type PostsList = { posts: Array<PostItem> }

export type IDXInit = PostsList & {
    ceramic: Ceramic
    idx: IDX
}


// USE Hardcoded seed here
export async function getIDX(seed: Uint8Array): Promise<IDXInit> {
    const ceramic = new Ceramic(CERAMIC_URL)
    const resolver = new Resolver({
        ...KeyDidResolver.getResolver(),
        ...ThreeIdResolver.getResolver(ceramic)
    })
    const provider = new Ed25519Provider(seed)
    const did = new DID({ provider, resolver })
    ceramic.did = did
    await ceramic.did.authenticate()

    // Create the IDX instance with the definitions aliases from the config
    const idx = new IDX({ ceramic, aliases: definitions })

    // Load the existing posts
    const postsList = await idx.get<{ posts: Array<PostItem> }>('posts')
    return { ceramic, idx, posts: postsList?.posts ?? [] }
}