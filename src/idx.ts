import Ceramic from '@ceramicnetwork/http-client'
import { IDX } from '@ceramicstudio/idx'
import { Ed25519Provider } from 'key-did-provider-ed25519'
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver';
import KeyDidResolver from 'key-did-resolver';
import { Resolver } from 'did-resolver';
import { DID } from 'dids';

import { definitions } from './config.json'
import internal from 'stream';

const CERAMIC_URL = 'http://localhost:7007'

export type UserItem = {
  id: string
  firstName: string
  lastName: string
  username: string
  dateCreated: Date
}

type LockItem = {
    unlockAddress: string
    chainId: number
}

export type PostItem = {
    id: string
    encContent: string
    unlockLocks: Array<LockItem>
  }


export type PostList = { posts: Array<PostItem> }

export type IDXInit = {
  ceramic: Ceramic
  idx: IDX
  userData?: UserItem
  myPosts: Array<PostItem>
}

export async function getIDX(seed: Uint8Array): Promise<IDXInit> {
  // Create the Ceramic instance and inject DID provider and resolver
  const ceramic = new Ceramic(CERAMIC_URL)
  const resolver = new Resolver({
      ...KeyDidResolver.getResolver(),
      ...ThreeIdResolver.getResolver(ceramic) })
  const provider = new Ed25519Provider(seed)
  const did = new DID({ provider, resolver })
  await did.authenticate()
  await ceramic.setDID(did)

  // Create the IDX instance with the definitions aliases from the config
  const idx = new IDX({ ceramic, aliases: definitions })

  // Load existing user

  const userData = await idx.get<{ user: UserItem }>('user')

  // Load the existing posts
  const postsList = await idx.get<{ posts: Array<PostItem> }>('posts')

  return { ceramic, idx, userData: userData?.user, myPosts: postsList?.posts ?? []}
}