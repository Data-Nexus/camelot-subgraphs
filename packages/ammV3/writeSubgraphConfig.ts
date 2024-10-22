import TARGET_CHAIN from "common/helpers/createTargetChain"
import { loadSubgraphConfig, saveSubgraphConfig } from "common/helpers/subgraphConfig"

const {
  // UNIVERSAL SELECTED CHAIN PARAM - USED FOR `network` IN `subgraph.yaml`
  network,

  // AMM V3 PARAMS
  factoryV3,
  nftPositionManager,
  startBlockAmmV3,
  apiVersion,
} = TARGET_CHAIN

const { subgraphYaml, subgraphPath } = loadSubgraphConfig()

const factory = subgraphYaml.dataSources[0]
const NFTPositionManager = subgraphYaml.dataSources[1]

factory.network = network
factory.source.address = factoryV3
factory.source.startBlock = startBlockAmmV3
factory.mapping.apiVersion = apiVersion

NFTPositionManager.network = network
NFTPositionManager.source.address = nftPositionManager
NFTPositionManager.source.startBlock = startBlockAmmV3
NFTPositionManager.mapping.apiVersion = apiVersion

subgraphYaml.templates[0].network = network
subgraphYaml.templates[0].mapping.apiVersion = apiVersion

saveSubgraphConfig(subgraphYaml, subgraphPath)