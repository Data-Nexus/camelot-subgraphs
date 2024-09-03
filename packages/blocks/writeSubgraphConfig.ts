import TARGET_CHAIN from "common/helpers/createTargetChain.ts"
import { loadSubgraphConfig, saveSubgraphConfig } from "common/helpers/subgraphConfig.ts"

const {
  // UNIVERSAL SELECTED CHAIN PARAM - USED FOR `network` IN `subgraph.yaml`
  network,
} = TARGET_CHAIN

const { subgraphYaml, subgraphPath } = loadSubgraphConfig()

const converterRegistry = subgraphYaml.dataSources[0]

  converterRegistry.network = network

saveSubgraphConfig(subgraphYaml, subgraphPath)