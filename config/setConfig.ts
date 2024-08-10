import fs from "fs"
import path from "path"
import process from "process"
import yaml from "js-yaml"

import {
  TARGET_CHAIN
} from "./chains.ts"

const {
  // UNIVERSAL SELECTED CHAIN PARAM - USED FOR `network` IN `subgraph.yaml`
  selectedChain,

  // AMM V2 PARAMS
  factoryV2,
  startBlockAmmV2,

  // AMM V3 PARAMS
  factoryV3,
  nftPositionManager,
  startBlockAmmV3,
  apiVersion,

  // INCENTIVES PARAMS
  campaignFactory,
  distributor,
  startBlockIncentives,
} = TARGET_CHAIN

const desiredSubgraph = process.argv[2]?.toLowerCase();

const loadSubgraphConfig = (subgraphName) => {
  const subgraphPath = path.join(process.cwd(), 'packages', subgraphName, 'subgraph.yaml')
  const subgraphConfig = fs.readFileSync(subgraphPath, 'utf8');
  const subgraphYaml = yaml.load(subgraphConfig) as any;
  return { subgraphYaml, subgraphPath }
}

const saveSubgraphConfig = (subgraphYaml, subgraphPath) => {
  const updatedSubgraph = yaml.dump(subgraphYaml);
  fs.writeFileSync(subgraphPath, updatedSubgraph, 'utf8');
}

const saveConfigAmmV2 = () => {
  const { subgraphYaml, subgraphPath } = loadSubgraphConfig('ammV2')

  const factory = subgraphYaml.dataSources[0] as any
  factory.network = selectedChain
  factory.source.address = factoryV2
  factory.source.startBlock = startBlockAmmV2
  subgraphYaml.templates[0].network = selectedChain

  saveSubgraphConfig(subgraphYaml, subgraphPath)
}

const saveConfigAmmV3 = () => {
  const { subgraphYaml, subgraphPath } = loadSubgraphConfig('ammV3')

  const factory = subgraphYaml.dataSources[0]
  const NFTPositionManager = subgraphYaml.dataSources[1]

  factory.network = selectedChain
  factory.source.address = factoryV3
  factory.source.startBlock = startBlockAmmV3
  factory.mapping.apiVersion = apiVersion

  NFTPositionManager.network = selectedChain
  NFTPositionManager.source.address = nftPositionManager
  NFTPositionManager.source.startBlock = startBlockAmmV3
  NFTPositionManager.mapping.apiVersion = apiVersion

  subgraphYaml.templates[0].network = selectedChain
  subgraphYaml.templates[0].mapping.apiVersion = apiVersion

  saveSubgraphConfig(subgraphYaml, subgraphPath)
}

const saveConfigBlocks = () => {
  const { subgraphYaml, subgraphPath } = loadSubgraphConfig('blocks')

  const converterRegistry = subgraphYaml.dataSources[0]

  converterRegistry.network = selectedChain

  saveSubgraphConfig(subgraphYaml, subgraphPath)
}

const saveConfigIncentives = () => {
  const { subgraphYaml, subgraphPath } = loadSubgraphConfig('incentives')

  const subgraphCampaignFactory = subgraphYaml.dataSources[0] as any
  subgraphCampaignFactory.network = selectedChain,
  subgraphCampaignFactory.source.address = campaignFactory
  subgraphCampaignFactory.source.startBlock = startBlockIncentives

  const subgraphDistributor = subgraphYaml.dataSources[1] as any
  subgraphDistributor.network = selectedChain,
  subgraphDistributor.source.address = distributor
  subgraphDistributor.source.startBlock = startBlockIncentives

  saveSubgraphConfig(subgraphYaml, subgraphPath)
}

const mappings = {
  'ammv2': saveConfigAmmV2,
  'ammv3': saveConfigAmmV3,
  'blocks': saveConfigBlocks,
  'incentives': saveConfigIncentives
}

// No subgraph specified, set config for all
if (!desiredSubgraph) {
  saveConfigAmmV2()
  saveConfigAmmV3()
  saveConfigBlocks()
  saveConfigIncentives()
} else {
  mappings[desiredSubgraph]()
}


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