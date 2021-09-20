const { writeFile } = require('fs').promises
const Ceramic = require('@ceramicnetwork/http-client').default
const { createDefinition, publishSchema } = require('@ceramicstudio/idx-tools')
const { Ed25519Provider } = require('key-did-provider-ed25519')
const ThreeIdResolver = require('@ceramicnetwork/3id-did-resolver').default
const KeyDidResolver = require('key-did-resolver').default
const { Resolver } = require('did-resolver')
const { DID } = require('dids')
const {fromString} = require('uint8arrays/from-string')

const CERAMIC_URL = 'https://ceramic-clay.3boxlabs.com'

const UserSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'User',
  type: 'object',
  properties: {
    firstName: {
      type: 'string',
      title: 'text',
      maxLength: 40,
    },
    lastName: {
      type: 'string',
      title: 'text',
      maxLength: 40,
    },
    username: {
      type: 'string',
      title: 'text',
      maxLength: 40,
    },
    dateCreated: {
      type: 'string',
      format: 'date-time',
      title: 'text',
      maxLength: 30,
    },
  },
}

// unlockLocks: {
//   type: 'array',
//   title: 'unlocks',
//   items: {
//     type: 'object',
//     title: 'UnlockItems',
//     properties: {
//       unlockAddress: {
//         type: 'string',
//         title: 'address',
//         maxLength: 200,
//       },
//       chainId: {
//         type: 'integer',
//         minimum: 0,
//       }
//     },
//   },
// }

const PostSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Post',
  type: 'object',
  properties: {
    encContent: {
      type: 'string',
      title: 'text',
      maxLength: 4000,
    },
    id: {
      type: 'string',
      title: 'text',
      maxLength: 4000,
    },
    unlockLocks: {
      type: 'string',
      title: 'text',
      maxLength: 4000,
    }
  },
  definitions: {
    CeramicStreamId: {
      type: 'string',
      pattern: '^ceramic://.+(\\\\?version=.+)?',
      maxLength: 150,
    },
  },
}

const PostsListSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'PostsList',
  type: 'object',
  properties: {
    posts: {
      type: 'array',
      title: 'posts',
      items: {
        type: 'object',
        title: 'PostItem',
        properties: {
          id: {
            $ref: '#/definitions/CeramicStreamId',
          },
          title: {
            type: 'string',
            title: 'title',
            maxLength: 100,
          },
        },
      },
    },
  },
  definitions: {
    CeramicStreamId: {
      type: 'string',
      pattern: '^ceramic://.+(\\\\?version=.+)?',
      maxLength: 150,
    },
  },
}

async function run() {
  // The seed must be provided as an environment variable   // process.env.SEED
  const seed = fromString("56df6a0653cb0c8796b9ed3f3597e379c0e3bdd8112dcf15512cc5a2607794b8", 'base16')
  // Connect to the local Ceramic node
  const ceramic = new Ceramic(CERAMIC_URL)
  // Provide the DID Resolver and Provider to Ceramic
  const resolver = new Resolver({
    ...KeyDidResolver.getResolver(),
    ...ThreeIdResolver.getResolver(ceramic)
  })
  const provider = new Ed25519Provider(seed)
  const did = new DID({ provider, resolver })
  await ceramic.setDID(did)
  // Authenticate the Ceramic instance with the provider
  await ceramic.did.authenticate()


  // Publish the two schemas
  const [userSchema, postSchema, postsListSchema] = await Promise.all([
    publishSchema(ceramic, { content: UserSchema }),
    publishSchema(ceramic, { content: PostSchema }),
    publishSchema(ceramic, { content: PostsListSchema }),
  ])

  // Create the definition using the created schema ID
  const userDefination = await createDefinition(ceramic, {
    name: 'user',
    description: 'simple user info',
    schema: userSchema.commitId.toUrl(),
  })

  // Create the definition using the created schema ID
  const postDefination = await createDefinition(ceramic, {
    name: 'post',
    description: 'post info',
    schema: postSchema.commitId.toUrl(),
  })

  // Write config to JSON file
  const config = {
    definitions: {
      users: userDefination.id.toString(),
      post: postDefination.id.toString(),
    },
    schemas: {
      User: userSchema.commitId.toUrl(),
      Post: postSchema.commitId.toUrl(),
      PostsListSchema: postsListSchema.commitId.toUrl(),
    },
  }
  await writeFile('./src/config.json', JSON.stringify(config))

  console.log('Config written to src/config.json file:', config)
  process.exit(0)
}

run().catch(console.error)