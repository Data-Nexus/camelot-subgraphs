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
const name = subgraphConfig?.subgraphName || "arbitrum-one"

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
  name,

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

// Sepolia Conf- keep until we decide what to do with it. We currently do not support it in chains list.

// const arbitrumSepolia = new ChainInfo(
//   // UNIVERSAL SELECTED CHAIN PARAM - USED FOR `network` IN `subgraph.yaml`
//   ARBITRUM_SEPOLIA,

//   // AMM V2 PARAMS
//   "0x18E621B64d7808c3C47bccbbD7485d23F257D26f",
//   "0x980b62da83eff3d4576c647993b0c1d7faf17c73",
//   "0x35142e6410a060546f89fe5dc865eb13fdff5514",
//   [
//     '0x980b62da83eff3d4576c647993b0c1d7faf17c73', // WETH
//     '0xb893e3334d4bd6c5ba8277fd559e99ed683a9fc7', // USDC
//   ],
//   "0xb893e3334d4bd6c5ba8277fd559e99ed683a9fc7",
//   "500",
//   "0.5",
//   "50",
//   8780258,

//   // AMM V3 PARAMS
//   "0xaA37Bea711D585478E1c04b04707cCb0f10D762a",
//   "0x79EA6cB3889fe1FC7490A1C69C7861761d882D4A",
//   "0x980b62da83eff3d4576c647993b0c1d7faf17c73",
//   "0x3965361ea4f9000ae3cf995f553115b2832d0e2d",
//   "0.1",
//   [
//     '0x980b62da83eff3d4576c647993b0c1d7faf17c73', // WETH
//     '0xb893e3334d4bd6c5ba8277fd559e99ed683a9fc7', // USDC
//   ],
//   [
//     '0xb893e3334d4bd6c5ba8277fd559e99ed683a9fc7', // USDC
//   ],
//   "0.0.6",
//   2131772,

//   // INCENTIVES PARAMS - EMPTY VALUES FOR UNSUPPORTED CHAIN
//   "0x0000000000000000000000000000000000000000",
//   "0x0000000000000000000000000000000000000000",
//   0
// )

// const gravity = new ChainInfo(
//   // UNIVERSAL SELECTED CHAIN PARAM - USED FOR `network` IN `subgraph.yaml`
//   GRAVITY,

//   // AMM V2 PARAMS
//   "0x7d8c6B58BA2d40FC6E34C25f9A488067Fe0D2dB4", // factory
//   "0xBB859E225ac8Fb6BE1C7e38D87b767e95Fef0EbD", // WG
//   "0xA67C07b61dBB705441A1f09cA6D405317175c2b1", // WG-USDC
//   [
//     "0xBB859E225ac8Fb6BE1C7e38D87b767e95Fef0EbD", // WG
//     "0xFbDa5F676cB37624f28265A144A48B0d6e87d3b6", // USDC
//     "0x816E810f9F787d669FB71932DeabF6c83781Cd48", // USDT
//     "0xf6f832466Cd6C21967E0D954109403f36Bc8ceaA", // WETH
//     "0x729ed87bbE7B7e4B7F09BCb9c668580818d98BB9", // WBTC
//     "0xBFBBc4dA47508e85AC18DFC961fa182194E85f9a", // DAI
//   ],
//   "0xFbDa5F676cB37624f28265A144A48B0d6e87d3b6", // USDC
//   "500",
//   "100",
//   "100000",
//   11985,

//   // AMM V3 PARAMS
//   "0x10aA510d94E094Bd643677bd2964c3EE085Daffc",
//   "0x30A4bD5b1a9e9C0D80e9a45ef486bc1f1bc8e230",
//   "0xBB859E225ac8Fb6BE1C7e38D87b767e95Fef0EbD",
//   "0xa3FfAc3EBFA18b5BC4f2Ae10086403E85FBF6b2B",
//   "100",
//   [
//     "0xBB859E225ac8Fb6BE1C7e38D87b767e95Fef0EbD", // WG
//     "0xFbDa5F676cB37624f28265A144A48B0d6e87d3b6", // USDC
//     "0x816E810f9F787d669FB71932DeabF6c83781Cd48", // USDT
//     "0xf6f832466Cd6C21967E0D954109403f36Bc8ceaA", // WETH
//     "0x729ed87bbE7B7e4B7F09BCb9c668580818d98BB9", // WBTC
//     "0xBFBBc4dA47508e85AC18DFC961fa182194E85f9a", // DAI
//   ],
//   [
//     '0xFbDa5F676cB37624f28265A144A48B0d6e87d3b6', // USDC
//   ],
//   "0.0.6",
//   11988,

//   // INCENTIVES PARAMS - EMPTY VALUES FOR UNSUPPORTED CHAIN
//   "0x0000000000000000000000000000000000000000",
//   "0x0000000000000000000000000000000000000000",
//   0
// )

