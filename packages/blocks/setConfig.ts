import { TARGET_CHAIN, loadSubgraphConfig, saveSubgraphConfig } from "common"

const {
  // UNIVERSAL SELECTED CHAIN PARAM - USED FOR `network` IN `subgraph.yaml`
  network,
} = TARGET_CHAIN

const { subgraphYaml, subgraphPath } = loadSubgraphConfig()

const converterRegistry = subgraphYaml.dataSources[0]

  converterRegistry.network = network

saveSubgraphConfig(subgraphYaml, subgraphPath)