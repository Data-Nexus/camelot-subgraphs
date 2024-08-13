import { TARGET_CHAIN, loadSubgraphConfig, saveSubgraphConfig } from "common"

const {
  // UNIVERSAL SELECTED CHAIN PARAM - USED FOR `network` IN `subgraph.yaml`
  network,

  // AMM V2 PARAMS
  factoryV2,
  startBlockAmmV2,
} = TARGET_CHAIN

const { subgraphYaml, subgraphPath } = loadSubgraphConfig()

const factory = subgraphYaml.dataSources[0] as any
factory.network = network
factory.source.address = factoryV2
factory.source.startBlock = startBlockAmmV2
subgraphYaml.templates[0].network = network

saveSubgraphConfig(subgraphYaml, subgraphPath)

// AMM v2 do we need this?
// const networksJSON = {
//   [configName]: {
//     "Factory": {
//       "address": factory,
//       "startBlock": startBlock
//     }
//   }
// }

// fs.writeFileSync(networksPath, JSON.stringify(networksJSON, null, 2), 'utf8')