import { writeFile } from 'node:fs/promises'
import { CeramicClient } from '@ceramicnetwork/http-client'
import { ModelManager } from '@glazed/devtools'
import { DID } from 'dids'
import { Ed25519Provider } from 'key-did-provider-ed25519'
import { getResolver } from 'key-did-resolver'
import { fromString } from 'uint8arrays'

// The seed must be provided as an environment variable
const seed = fromString(process.env.SEED, 'base16')
// Create and authenticate the DID
const did = new DID({
  provider: new Ed25519Provider(seed),
  resolver: getResolver(),
})
await did.authenticate()

// Connect to the local Ceramic node
const ceramic = new CeramicClient('https://ceramic-clay.3boxlabs.com')
ceramic.did = did

// Create a manager for the model
const manager = new ModelManager(ceramic)

// Create the schemas
const profielSchemaID = await manager.createSchema('Profile', {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Profile',
  type: 'object',
  properties: {
    username: {
      type: "string",
      maxLength: 240
    },
    firstName: {
      type: "string",
      maxLength: 50
    },
    lastName: {
      type: "string",
      maxLength: 50
    },
    description: {
      type: "string",
      maxLength: 420
    },
    gender: {
      type: "string",
      maxLength: 42
    },
    residenceCountry: {
      type: "string",
      pattern: "^[A-Z]{2}$"
    }
  }
})



// Write model to JSON file
const model = await manager.toPublished()
await writeFile('./src/model.json', JSON.stringify(model))

console.log('Model written to src/model.json file:', model)
