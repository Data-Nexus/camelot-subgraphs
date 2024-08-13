import { TARGET_CHAIN, loadSubgraphConfig, saveSubgraphConfig } from "common"

const {
  // UNIVERSAL SELECTED CHAIN PARAM - USED FOR `network` IN `subgraph.yaml`
  network,

  // INCENTIVES PARAMS
  campaignFactory,
  distributor,
  startBlockIncentives,
} = TARGET_CHAIN

const { subgraphYaml, subgraphPath } = loadSubgraphConfig()

const subgraphCampaignFactory = subgraphYaml.dataSources[0] as any
subgraphCampaignFactory.network = network,
subgraphCampaignFactory.source.address = campaignFactory
subgraphCampaignFactory.source.startBlock = startBlockIncentives

const subgraphDistributor = subgraphYaml.dataSources[1] as any
subgraphDistributor.network = network,
subgraphDistributor.source.address = distributor
subgraphDistributor.source.startBlock = startBlockIncentives

saveSubgraphConfig(subgraphYaml, subgraphPath)