import process from "process"
import fs from "fs"
import path from "path"

import ChainInfo from "./chainInfo.ts"

const chainConfigRaw = fs.readFileSync(path.join(process.cwd(), "config", "chainConfig.json"), "utf-8")
const chainConfig = JSON.parse(chainConfigRaw)
const TARGET_CHAIN_ID = process.env.chainId

const parsedChainId = TARGET_CHAIN_ID ? parseInt(TARGET_CHAIN_ID, 10) : 42161
const config = chainConfig.find(chain => chain.id == parsedChainId)

if (!config) throw new Error("Chain ID not supported")

const subgraphConfig = config?.subgraphs.config

// UNIVERSAL SELECTED CHAIN PARAM - USED FOR `network` IN `subgraph.yaml`
const network = subgraphConfig?.network || "arbitrum-one"

// AMM V2 PARAMS
const factoryV2 = config?.contracts.factoryV2
const wrappedNativeV2 = config?.assets.native.address
const wrappedNativeUSDCPoolV2 = config?.assets.nativePairV2
const whitelistTokensV2 = subgraphConfig?.whitelistTokensV2
const stableCoin = config?.assets.stable
const minimumUSDThresholdNewPairs = subgraphConfig?.minimumUSDThresholdNewPairs
const minimumLiquidityThresholdETHV2 = subgraphConfig?.minimumLiquidityThresholdETHV2
const minimumLiquidityETH = subgraphConfig?.minimumLiquidityETH
const startBlockAmmV2 = subgraphConfig?.startBlockAmmV2

// AMM V3 PARAMS
const factoryV3 = config?.contracts.factoryV3
const nftPositionManagerV3 = config?.contracts.nftPositionManagerV3
const wrappedNativeV3 = config?.assets.native.address
const wrappedNativeUSDCPoolV3 = config?.assets.nativePairV3
const minimumLiquidityThresholdETHV3 = subgraphConfig?.minimumLiquidityThresholdETHV3
const whitelistTokensV3 = subgraphConfig?.whitelistTokensV3
const stableCoins = subgraphConfig?.stableCoins
const apiVersion = subgraphConfig?.apiVersion
const startBlockAmmV3 = subgraphConfig?.startBlockAmmV3

// INCENTIVES PARAMS
const campaignFactory = config?.contracts.incentivesCampaignFactory
const distributor = config?.contracts.incentivesDistributor
const startBlockIncentives = subgraphConfig?.startBlockIncentives

const TARGET_CHAIN: ChainInfo = new ChainInfo(
  network,

  factoryV2,
  wrappedNativeV2,
  wrappedNativeUSDCPoolV2,
  whitelistTokensV2,
  stableCoin,
  minimumUSDThresholdNewPairs,
  minimumLiquidityThresholdETHV2,
  minimumLiquidityETH,
  startBlockAmmV2,

  factoryV3,
  nftPositionManagerV3,
  wrappedNativeV3,
  wrappedNativeUSDCPoolV3,
  minimumLiquidityThresholdETHV3,
  whitelistTokensV3,
  stableCoins,
  apiVersion,
  startBlockAmmV3,

  campaignFactory,
  distributor,
  startBlockIncentives
)

export default TARGET_CHAIN