import fs from "fs"
import { fileURLToPath } from 'url'
import path from "path"
import ChainInfo from "./chainInfo.ts"
import dotenv from "dotenv"

const getCurrentDir = () => {
  const __filename = fileURLToPath(import.meta.url)
  return path.dirname(__filename)
}
const currentDir = getCurrentDir()
dotenv.config({ path: path.resolve(currentDir, '../../../.env') });

const chainConfigRaw = fs.readFileSync(path.resolve(currentDir, '../generated/chainConfig.json'), "utf-8")
const chainConfig = JSON.parse(chainConfigRaw)
const TARGET_CHAIN_ID = process.env.CHAIN_ID || "42161"

const config = chainConfig.find(chain => parseInt(chain.id) === parseInt(TARGET_CHAIN_ID))

if (!config) throw new Error("Chain ID not supported")

const subgraphConfig = config?.subgraphs.config

// UNIVERSAL SELECTED CHAIN PARAM - USED FOR `network` IN `subgraph.yaml`
const network = subgraphConfig?.network || "arbitrum-one"

// AMM V2 PARAMS
const ammv2Name = config?.subgraphs.ammV2.name
const factoryV2 = config?.contracts.factoryV2.toLowerCase()
const wrappedNativeV2 = config?.assets.native.address.toLowerCase()
const wrappedNativeUSDCPoolV2 = config?.assets.nativePairV2.toLowerCase()
const whitelistTokensV2 = subgraphConfig?.whitelistTokensV2.map(token => token.toLowerCase())
const stableCoin = config?.assets.stable.toLowerCase()
const minimumUSDThresholdNewPairs = subgraphConfig?.minimumUSDThresholdNewPairs
const minimumLiquidityThresholdETHV2 = subgraphConfig?.minimumLiquidityThresholdETHV2
const minimumLiquidityETH = subgraphConfig?.minimumLiquidityETH
const startBlockAmmV2 = subgraphConfig?.startBlockAmmV2

// AMM V3 PARAMS
const ammv3Name = config?.subgraphs.ammV3.name
const factoryV3 = config?.contracts.factoryV3.toLowerCase()
const nftPositionManagerV3 = config?.contracts.nftPositionManagerV3.toLowerCase()
const wrappedNativeV3 = config?.assets.native.address.toLowerCase()
const wrappedNativeUSDCPoolV3 = config?.assets.nativePairV3.toLowerCase()
const minimumLiquidityThresholdETHV3 = subgraphConfig?.minimumLiquidityThresholdETHV3
const whitelistTokensV3 = subgraphConfig?.whitelistTokensV3.map(token => token.toLowerCase())
const stableCoins = subgraphConfig?.stableCoins.map(coin => coin.toLowerCase())
const apiVersion = subgraphConfig?.apiVersion
const startBlockAmmV3 = subgraphConfig?.startBlockAmmV3

// INCENTIVES PARAMS
const incentivesName = config?.subgraphs.incentives.name
const campaignFactory = config?.contracts.campaignFactory?.toLowerCase()
const distributor = config?.contracts.distributor?.toLowerCase()
const startBlockIncentives = subgraphConfig?.startBlockIncentives

// BLOCKS PARAMS
const blocksName = config?.subgraphs.blocks.name

// name is undefined, need to edit

console.log("AMMv2", config?.subgraphs.ammV2)
console.log("AMMv3", config?.subgraphs.ammV3)
console.log("blocks", config?.subgraphs.blocks)
console.log("incentives", config?.subgraphs.incentives)

const TARGET_CHAIN: ChainInfo = new ChainInfo(
  network,

  ammv2Name,
  factoryV2,
  wrappedNativeV2,
  wrappedNativeUSDCPoolV2,
  whitelistTokensV2,
  stableCoin,
  minimumUSDThresholdNewPairs,
  minimumLiquidityThresholdETHV2,
  minimumLiquidityETH,
  startBlockAmmV2,

  ammv3Name,
  factoryV3,
  nftPositionManagerV3,
  wrappedNativeV3,
  wrappedNativeUSDCPoolV3,
  minimumLiquidityThresholdETHV3,
  whitelistTokensV3,
  stableCoins,
  apiVersion,
  startBlockAmmV3,

  incentivesName,
  campaignFactory,
  distributor,
  startBlockIncentives,

  blocksName,
)

const targetChainContent = `
// @ts-nocheck

// *********************************************************
// THIS IS A GENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// *********************************************************

import ChainInfo from '../helpers/chainInfo';

const TARGET_CHAIN: ChainInfo = new ChainInfo(
  "${network}",

  "${ammv2Name}",
  "${factoryV2}",
  "${wrappedNativeV2}",
  "${wrappedNativeUSDCPoolV2}",
  ${JSON.stringify(whitelistTokensV2)},
  "${stableCoin}",
  "${minimumUSDThresholdNewPairs}",
  "${minimumLiquidityThresholdETHV2}",
  "${minimumLiquidityETH}",
  ${startBlockAmmV2},

  "${ammv3Name}",
  "${factoryV3}",
  "${nftPositionManagerV3}",
  "${wrappedNativeV3}",
  "${wrappedNativeUSDCPoolV3}",
  "${minimumLiquidityThresholdETHV3}",
  ${JSON.stringify(whitelistTokensV3)},
  ${JSON.stringify(stableCoins)},
  "${apiVersion}",
  ${startBlockAmmV3},

  "${incentivesName}",
  "${campaignFactory}",
  "${distributor}",
  ${startBlockIncentives},

  "${blocksName}",
);

export default TARGET_CHAIN;
`

// write chain config to a separate TS file
fs.writeFileSync(path.resolve(currentDir, "../generated/targetChain.ts"), targetChainContent)

export default TARGET_CHAIN