// naming in line with subgraph config convention

const ARBITRUM_ONE = "arbitrum-one"
const ARBITRUM_SEPOLIA = "arbitrum-sepolia"
const MOLTEN = "camelot-molten"
const PROOF_OF_PLAY = "camelot-proofofplay-apex"
const GRAVITY = "camelot-gravity"
const RARI = "camelot-rari"
const REYA = "camelot-reya"
const SANKO = "camelot-sanko"
const XAI = "xai"

class ChainInfo {
  // UNIVERSAL SELECTED CHAIN PARAM - USED FOR `network` IN `subgraph.yaml`
  selectedChain: string;

  // AMM V2 PARAMS
  factoryV2: string;
  wrappedNativeV2: string;
  wrappedNativeUSDCPoolV2: string;
  whitelistTokensV2: Array<string>;
  stableCoin: string;
  minimumUSDThresholdNewPairs: string;
  minimumLiquidityThresholdETH: string;
  minimumLiquidityETH: string;
  startBlockAmmV2: number;

  // AMM V3 PARAMS
  factoryV3: string;
  nftPositionManager: string;
  wrappedNativeV3: string;
  wrappedNativeUSDCPoolV3: string;
  minimumMaticLocked: string;
  whitelistTokensV3: string[];
  stableCoins: string[];
  apiVersion: string;
  startBlockAmmV3: number;

  // BLOCKS PARAMS - ONLY USES `selectedChain`

  // INCENTIVES PARAMS
  campaignFactory: string;
  distributor: string;
  startBlockIncentives: number;

  constructor(
    // UNIVERSAL SELECTED CHAIN PARAM - USED FOR `network` IN `subgraph.yaml`
    selectedChain: string,

    // AMM V2 PARAMS
    factoryV2: string,
    wrappedNativeV2: string,
    wrappedNativeUSDCPoolV2: string,
    whitelistTokensV2: Array<string>,
    stableCoin: string,
    minimumUSDThresholdNewPairs: string,
    minimumLiquidityThresholdETH: string,
    minimumLiquidityETH: string,
    startBlockAmmV2: number,

    // AMM V3 PARAMS
    factoryV3: string,
    nftPositionManager: string,
    wrappedNativeV3: string,
    wrappedNativeUSDCPoolV3: string,
    minimumMaticLocked: string,
    whitelistTokensV3: string[],
    stableCoins: string[],
    apiVersion: string,
    startBlockAmmV3: number,

    // INCENTIVES PARAMS
    campaignFactory: string,
    distributor: string,
    startBlockIncentives: number,
  ) {
    // UNIVERSAL SELECTED CHAIN PARAM - USED FOR `network` IN `subgraph.yaml`
    this.selectedChain = selectedChain.toLowerCase()

    // AMM V2 PARAMS
    this.factoryV2 = factoryV2.toLowerCase()
    this.wrappedNativeV2 = wrappedNativeV2.toLowerCase()
    this.wrappedNativeUSDCPoolV2 = wrappedNativeUSDCPoolV2.toLowerCase()
    this.whitelistTokensV2 = whitelistTokensV2.map<string>((t: string): string => t.toLowerCase())
    this.stableCoin = stableCoin.toLowerCase()
    this.minimumUSDThresholdNewPairs = minimumUSDThresholdNewPairs
    this.minimumLiquidityThresholdETH = minimumLiquidityThresholdETH
    this.minimumLiquidityETH = minimumLiquidityETH
    this.startBlockAmmV2 = startBlockAmmV2

    // AMM V3 PARAMS
    this.factoryV3 = factoryV3.toLowerCase()
    this.nftPositionManager = nftPositionManager.toLowerCase()
    this.wrappedNativeV3 = wrappedNativeV3.toLowerCase()
    this.wrappedNativeUSDCPoolV3 = wrappedNativeUSDCPoolV3.toLowerCase()
    this.minimumMaticLocked = minimumMaticLocked
    this.whitelistTokensV3 = whitelistTokensV3.map<string>((t: string): string => t.toLowerCase())
    this.stableCoins = stableCoins.map<string>((t: string): string => t.toLowerCase())
    this.apiVersion = apiVersion
    this.startBlockAmmV3 = startBlockAmmV3

    // INCENTIVES PARAMS
    this.campaignFactory = campaignFactory.toLowerCase()
    this.distributor = distributor.toLowerCase()
    this.startBlockIncentives = startBlockIncentives
  }
}

class SupportedChains {
  arbitrumOne: ChainInfo;
  arbitrumSepolia: ChainInfo;
  gravity: ChainInfo;
  molten: ChainInfo;
  proofOfPlay: ChainInfo;
  rari: ChainInfo;
  reya: ChainInfo;
  sanko: ChainInfo;
  xai: ChainInfo;

  constructor(
    arbitrumOne: ChainInfo,
    arbitrumSepolia: ChainInfo,
    gravity: ChainInfo,
    molten: ChainInfo,
    proofOfPlay: ChainInfo,
    rari: ChainInfo,
    reya: ChainInfo,
    sanko: ChainInfo,
    xai: ChainInfo
  ) {
    this.arbitrumOne = arbitrumOne;
    this.arbitrumSepolia = arbitrumSepolia;
    this.gravity = gravity;
    this.molten = molten;
    this.proofOfPlay = proofOfPlay;
    this.rari = rari;
    this.reya = reya;
    this.sanko = sanko;
    this.xai = xai;
  }
}

const arbitrumOne = new ChainInfo(
  // UNIVERSAL SELECTED CHAIN PARAM - USED FOR `network` IN `subgraph.yaml`
  ARBITRUM_ONE,

  // AMM V2 PARAMS
  "0x6EcCab422D763aC031210895C81787E87B43A652",
  '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
  '0x84652bb2539513baf36e225c930fdd8eaa63ce27',
  [
    '0x82af49447d8a07e3bd95bd0d56f35241523fbab1', // WETH
    '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8', // USDC.e
    '0xaf88d065e77c8cc2239327c5edb3a432268e5831', // USDC
    '0x912ce59144191c1204e64559fe8253a0e49e6548', // ARB
    '0xd74f5255d557944cf7dd0e45ff521520002d5748', // USDs
    '0x1622bf67e6e5747b81866fe0b85178a93c7f86e3', // UMAMI
    '0x6c2c06790b3e3e3c38e12ee22f8183b37a13ee55', // DPX
    '0x5979d7b546e38e414f7e9822514be443a4800529', // wstETH
    '0x6cda1d3d092811b2d48f7476adb59a6239ca9b95', // stafi-rETH
    '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9', // USDT
    '0xda10009cbd5d07dd0cecc66161fc93d7c9000da1', // DAI
  ],
  "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8",
  "500",
  "0.5",
  "50",
  35061163,

  // AMM V3 PARAMS
  "0x1a3c9B1d2F0529D97f2afC5136Cc23e58f1FD35B",
  "0x00c7f3082833e796A5b3e4Bd59f6642FF44DCD15",
  '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
  '0x521aa84ab3fcc4c05cabac24dc3682339887b126',
  "0.1",
  [
    '0x82af49447d8a07e3bd95bd0d56f35241523fbab1', // WETH
    '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8', // USDC.e
    '0xaf88d065e77c8cc2239327c5edb3a432268e5831', // USDC
    '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9', // USDT
    '0x3d9907f9a368ad0a51be60f7da3b97cf940982d8', // GRAIL
    '0x912ce59144191c1204e64559fe8253a0e49e6548', // ARB
    '0xda10009cbd5d07dd0cecc66161fc93d7c9000da1', // DAI
    '0xd74f5255d557944cf7dd0e45ff521520002d5748', // USDs
    '0x1622bf67e6e5747b81866fe0b85178a93c7f86e3', // UMAMI
    '0x6c2c06790b3e3e3c38e12ee22f8183b37a13ee55', // DPX
    '0x5979d7b546e38e414f7e9822514be443a4800529', // wstETH
    '0x6cda1d3d092811b2d48f7476adb59a6239ca9b95', // stafi-rETH
    '0x0ae38f7e10a43b5b2fb064b42a2f4514cba909ef', // unsheth
    '0x0c880f6761f1af8d9aa9c466984b80dab9a8c9e8', // PENDLE
    '0xfc5a1a6eb076a2c7ad06ed22c90d7e710e35ad0a' // GMX
  ],
  [
    '0xaf88d065e77c8cc2239327c5edb3a432268e5831', // USDC
    '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8', // USDC.e
    '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9', // USDT
    '0xda10009cbd5d07dd0cecc66161fc93d7c9000da1', // DAI
    '0xd74f5255d557944cf7dd0e45ff521520002d5748' // USDs
  ],
  "0.0.5",
  101163736,

  // INCENTIVES PARAMS
  "0x8f63A030a9c4aD80c65BD54Df824e3b386c111C3",
  "0x9a230691817aFfcDacab3e99109e64700896E6e6",
  226026624
)

const arbitrumSepolia = new ChainInfo(
  // UNIVERSAL SELECTED CHAIN PARAM - USED FOR `network` IN `subgraph.yaml`
  ARBITRUM_SEPOLIA,

  // AMM V2 PARAMS
  "0x18E621B64d7808c3C47bccbbD7485d23F257D26f",
  "0x980b62da83eff3d4576c647993b0c1d7faf17c73",
  "0x35142e6410a060546f89fe5dc865eb13fdff5514",
  [
    '0x980b62da83eff3d4576c647993b0c1d7faf17c73', // WETH
    '0xb893e3334d4bd6c5ba8277fd559e99ed683a9fc7', // USDC
  ],
  "0xb893e3334d4bd6c5ba8277fd559e99ed683a9fc7",
  "500",
  "0.5",
  "50",
  8780258,

  // AMM V3 PARAMS
  "0xaA37Bea711D585478E1c04b04707cCb0f10D762a",
  "0x79EA6cB3889fe1FC7490A1C69C7861761d882D4A",
  "0x980b62da83eff3d4576c647993b0c1d7faf17c73",
  "0x3965361ea4f9000ae3cf995f553115b2832d0e2d",
  "0.1",
  [
    '0x980b62da83eff3d4576c647993b0c1d7faf17c73', // WETH
    '0xb893e3334d4bd6c5ba8277fd559e99ed683a9fc7', // USDC
  ],
  [
    '0xb893e3334d4bd6c5ba8277fd559e99ed683a9fc7', // USDC
  ],
  "0.0.6",
  2131772,

  // INCENTIVES PARAMS - EMPTY VALUES FOR UNSUPPORTED CHAIN
  "0x0000000000000000000000000000000000000000",
  "0x0000000000000000000000000000000000000000",
  0
)

const gravity = new ChainInfo(
  // UNIVERSAL SELECTED CHAIN PARAM - USED FOR `network` IN `subgraph.yaml`
  GRAVITY,

  // AMM V2 PARAMS
  "0x7d8c6B58BA2d40FC6E34C25f9A488067Fe0D2dB4", // factory
  "0xBB859E225ac8Fb6BE1C7e38D87b767e95Fef0EbD", // WG
  "0xA67C07b61dBB705441A1f09cA6D405317175c2b1", // WG-USDC
  [
    "0xBB859E225ac8Fb6BE1C7e38D87b767e95Fef0EbD", // WG
    "0xFbDa5F676cB37624f28265A144A48B0d6e87d3b6", // USDC
    "0x816E810f9F787d669FB71932DeabF6c83781Cd48", // USDT
    "0xf6f832466Cd6C21967E0D954109403f36Bc8ceaA", // WETH
    "0x729ed87bbE7B7e4B7F09BCb9c668580818d98BB9", // WBTC
    "0xBFBBc4dA47508e85AC18DFC961fa182194E85f9a", // DAI
  ],
  "0xFbDa5F676cB37624f28265A144A48B0d6e87d3b6", // USDC
  "500",
  "100",
  "100000",
  11985,

  // AMM V3 PARAMS
  "0x10aA510d94E094Bd643677bd2964c3EE085Daffc",
  "0x30A4bD5b1a9e9C0D80e9a45ef486bc1f1bc8e230",
  "0xBB859E225ac8Fb6BE1C7e38D87b767e95Fef0EbD",
  "0xa3FfAc3EBFA18b5BC4f2Ae10086403E85FBF6b2B",
  "100",
  [
    "0xBB859E225ac8Fb6BE1C7e38D87b767e95Fef0EbD", // WG
    "0xFbDa5F676cB37624f28265A144A48B0d6e87d3b6", // USDC
    "0x816E810f9F787d669FB71932DeabF6c83781Cd48", // USDT
    "0xf6f832466Cd6C21967E0D954109403f36Bc8ceaA", // WETH
    "0x729ed87bbE7B7e4B7F09BCb9c668580818d98BB9", // WBTC
    "0xBFBBc4dA47508e85AC18DFC961fa182194E85f9a", // DAI
  ],
  [
    '0xFbDa5F676cB37624f28265A144A48B0d6e87d3b6', // USDC
  ],
  "0.0.6",
  11988,

  // INCENTIVES PARAMS - EMPTY VALUES FOR UNSUPPORTED CHAIN
  "0x0000000000000000000000000000000000000000",
  "0x0000000000000000000000000000000000000000",
  0
)

const molten = new ChainInfo(
  // UNIVERSAL SELECTED CHAIN PARAM - USED FOR `network` IN `subgraph.yaml`
  MOLTEN,

  // AMM V2 PARAMS
  "0x7d8c6B58BA2d40FC6E34C25f9A488067Fe0D2dB4", // factory
  "0xdBc38Db4F11b7D111477f17e757aa17dD3348a6d", // WMOLTEN
  "0x4d08d70ac96c9f858d0c9Ed6686d1D58caE5aE43", // WMOLTEN-USDC
  [
    "0xBB859E225ac8Fb6BE1C7e38D87b767e95Fef0EbD", // WMOLTEN
    "0x135B641E61CFC9a068b82E02fF0f051f6e5D4721", // USDC
    "0x09Bf29B44130e88F113C1Fb0487BCB97b6920C31", // WETH
  ],
  "0x135B641E61CFC9a068b82E02fF0f051f6e5D4721", // USDC
  "500",
  "100",
  "100000",
  3834334,

  // AMM V3 PARAMS
  "0x10aA510d94E094Bd643677bd2964c3EE085Daffc",
  "0xC216fCdEb961EEF95657Cb45dEe20e379C7624B8",
  "0xdBc38Db4F11b7D111477f17e757aa17dD3348a6d",
  "0xDC1eE81e57041Fe4613fbBD23572399C9297bb56",
  "100",
  [
    "0xdBc38Db4F11b7D111477f17e757aa17dD3348a6d", // WMOLTEN
    "0x135B641E61CFC9a068b82E02fF0f051f6e5D4721", // USDC
    "0x09Bf29B44130e88F113C1Fb0487BCB97b6920C31", // WETH
  ],
  [
    '0x135B641E61CFC9a068b82E02fF0f051f6e5D4721', // USDC
  ],
  "0.0.6",
  3834337,

  // INCENTIVES PARAMS - EMPTY VALUES FOR UNSUPPORTED CHAIN
  "0x0000000000000000000000000000000000000000",
  "0x0000000000000000000000000000000000000000",
  0
)

const proofOfPlay = new ChainInfo(
  // UNIVERSAL SELECTED CHAIN PARAM - USED FOR `network` IN `subgraph.yaml`
  PROOF_OF_PLAY,

  // AMM V2 PARAMS
  "0x7d8c6B58BA2d40FC6E34C25f9A488067Fe0D2dB4", // factory
  "0x77684A04145a5924eFCE0D92A7c4a2A2E8C359de", // WETH
  "0x8B58441D8787d95BD629a011176a4D6054805876", // WETH-USDC
  [
    "0x77684A04145a5924eFCE0D92A7c4a2A2E8C359de", // WETH
    "0xd7f991cF407C877dc91b2C6aCade45643925cf7a", // USDC
  ],
  "0xd7f991cF407C877dc91b2C6aCade45643925cf7a", // USDC
  "500",
  "0.1",
  "50",
  26275551,

  // AMM V3 PARAMS
  "0x10aA510d94E094Bd643677bd2964c3EE085Daffc",
  "0x30A4bD5b1a9e9C0D80e9a45ef486bc1f1bc8e230",
  "0x77684A04145a5924eFCE0D92A7c4a2A2E8C359de",
  "0xCf53A2F62316e9dDA38e34BaB131087e2eF325aE",
  "0.1",
  [
    '0x77684A04145a5924eFCE0D92A7c4a2A2E8C359de', // WETH
    '0xd7f991cF407C877dc91b2C6aCade45643925cf7a', // USDC
  ],
  [
    '0xd7f991cF407C877dc91b2C6aCade45643925cf7a', // USDC
  ],
  "0.0.6",
  26275615,

  // INCENTIVES PARAMS - EMPTY VALUES FOR UNSUPPORTED CHAIN
  "0x0000000000000000000000000000000000000000",
  "0x0000000000000000000000000000000000000000",
  0
)

const rari = new ChainInfo(
  // UNIVERSAL SELECTED CHAIN PARAM - USED FOR `network` IN `subgraph.yaml`
  RARI,

  // AMM V2 PARAMS
  "0x7d8c6B58BA2d40FC6E34C25f9A488067Fe0D2dB4", // factory
  "0xf037540e51d71b2d2b1120e8432ba49f29edfbd0", // WETH
  "0xa984428c00c878367b12cd49895bf6318734831e", // WETH-USDC
  [
    "0xf037540e51d71b2d2b1120e8432ba49f29edfbd0", // WETH
    "0xfbda5f676cb37624f28265a144a48b0d6e87d3b6", // USDC
    "0x362fae9a75b27bbc550aac28a7c1f96c8d483120", // USDT
  ],
  "0xfbda5f676cb37624f28265a144a48b0d6e87d3b6",
  "500",
  "0.1",
  "50",
  340544,

  // AMM V3 PARAMS
  "0xcF8d0723e69c6215523253a190eB9Bc3f68E0FFa",
  "0xc216fcdeb961eef95657cb45dee20e379c7624b8",
  "0xf037540e51d71b2d2b1120e8432ba49f29edfbd0", // WETH
  "0xa9cefdfec214309c7e291754c86de1fdaa443c2c", // WETH-USDC
  "0.1",
  [
    '0xf037540e51d71b2d2b1120e8432ba49f29edfbd0', // WETH
    '0xfbda5f676cb37624f28265a144a48b0d6e87d3b6', // USDC
    '0x362fae9a75b27bbc550aac28a7c1f96c8d483120', // USDT
  ],
  [
    '0xfbda5f676cb37624f28265a144a48b0d6e87d3b6', // USDC
    '0x362fae9a75b27bbc550aac28a7c1f96c8d483120', // USDT
  ],
  "0.0.6",
  340548,

  // INCENTIVES PARAMS - EMPTY VALUES FOR UNSUPPORTED CHAIN
  "0x0000000000000000000000000000000000000000",
  "0x0000000000000000000000000000000000000000",
  0
)

const reya = new ChainInfo(
  // UNIVERSAL SELECTED CHAIN PARAM - USED FOR `network` IN `subgraph.yaml`
  REYA,

  // AMM V2 PARAMS
  "0x7d8c6B58BA2d40FC6E34C25f9A488067Fe0D2dB4", // factory
  "0x6b48c2e6a32077ec17e8ba0d98ffc676dfab1a30", // WETH
  "0x4f37922db35bbf0d89c3f699c24a3152d6a5d9c0", // WETH-RUSD
  [
    "0x6b48c2e6a32077ec17e8ba0d98ffc676dfab1a30", // WETH
    "0xa9f32a851b1800742e47725da54a09a7ef2556a3", // RUSD
  ],
  "0xa9f32a851b1800742e47725da54a09a7ef2556a3", // RUSD
  "500",
  "0.1",
  "50",
  2932158,

  // AMM V3 PARAMS
  "0x10aA510d94E094Bd643677bd2964c3EE085Daffc",
  "0x30A4bD5b1a9e9C0D80e9a45ef486bc1f1bc8e230",
  "0x6B48C2e6A32077ec17e8Ba0d98fFc676dfab1A30", // WETH
  "0x2f7a2808A14368db0c9e20A2f0d0e74D0f65C90B", // WETH-rUSD
  "0.1",
  [
    '0x6B48C2e6A32077ec17e8Ba0d98fFc676dfab1A30', // WETH
    '0xa9F32a851B1800742e47725DA54a09A7Ef2556A3', // rUSD
  ],
  [
    '0xa9F32a851B1800742e47725DA54a09A7Ef2556A3', // rUSD
  ],
  "0.0.6",
  2932166,

  // INCENTIVES PARAMS - EMPTY VALUES FOR UNSUPPORTED CHAIN
  "0x0000000000000000000000000000000000000000",
  "0x0000000000000000000000000000000000000000",
  0
)

const sanko = new ChainInfo(
  // UNIVERSAL SELECTED CHAIN PARAM - USED FOR `network` IN `subgraph.yaml`
  SANKO,

  // AMM V2 PARAMS
  "0x7d8c6B58BA2d40FC6E34C25f9A488067Fe0D2dB4", // factory
  "0x754cdad6f5821077d6915004be2ce05f93d176f8", // WDMT
  "0x1ae55ce2c2ff85ea257786ed992873f4d387b2bb", // WDMT-USDC
  [
    "0x754cdad6f5821077d6915004be2ce05f93d176f8", // WDMT
    "0x13d675bc5e659b11cfa331594cf35a20815dcf02", // USDC
    "0xe01e3b20c5819cf919f7f1a2b4c18bbfd222f376" // WETH
  ], // WL tokens[]
  "0x13d675bc5e659b11cfa331594cf35a20815dcf02", // main stable
  "500", // minUSDThresholdPair
  "1", // minLiqThresholdETH
  "5000", // minLiqETH
  45, // start block

  // AMM V3 PARAMS
  "0xcF8d0723e69c6215523253a190eB9Bc3f68E0FFa",
  "0x30A4bD5b1a9e9C0D80e9a45ef486bc1f1bc8e230",
  "0x754cdad6f5821077d6915004be2ce05f93d176f8", // WDMT
  "0xacb574808d0556147a27d07945dd9b12da4e7aaf", // WDMT-USDC
  "1",
  [
    '0x754cdad6f5821077d6915004be2ce05f93d176f8', // WDMT
    '0x13d675bc5e659b11cfa331594cf35a20815dcf02', // USDC
  ],
  [
    '0x13d675bc5e659b11cfa331594cf35a20815dcf02', // USDC
  ],
  "0.0.6",
  51,

  // INCENTIVES PARAMS - EMPTY VALUES FOR UNSUPPORTED CHAIN
  "0x0000000000000000000000000000000000000000",
  "0x0000000000000000000000000000000000000000",
  0
)

const xai = new ChainInfo(
  // UNIVERSAL SELECTED CHAIN PARAM - USED FOR `network` IN `subgraph.yaml`
  XAI,

  // AMM V2 PARAMS
  "0x18E621B64d7808c3C47bccbbD7485d23F257D26f", // factory
  "0x3fB787101DC6Be47cfe18aeEe15404dcC842e6AF", // wnative
  "0xcffa8a7e0a2f1256e4c3ed17a153272f7ba6d7c5", // wnative-stable
  [
    "0x3fb787101dc6be47cfe18aeee15404dcc842e6af", // WXAI
    "0x1e3769bd5fb2e9e9e7d4ed8667c947661f9a82e3", // USDC
    "0xbee82cfdaff4a6aa4e4793cb81eb1c2e79ac463c" // WETH
  ], // WL tokens[]
  "0x1e3769bd5fb2e9e9e7d4ed8667c947661f9a82e3", // main stable
  "500", // minUSDThresholdPair
  "50", // minLiqThresholdETH
  "5000", // minLiqETH
  2436883, // start block

  // AMM V3 PARAMS
  "0xD8676fBdfa5b56BB2298D452c9768f51e80e34AE",
  "0xAcDcC3C6A2339D08E0AC9f694E4DE7c52F890Db3",
  "0x3fb787101dc6be47cfe18aeee15404dcc842e6af", // WXAI
  "0xe5a30cc140d2623090a62f64d73d971aac2e03ec", // WXAI-USDC
  "1",
  [
    '0x3fb787101dc6be47cfe18aeee15404dcc842e6af', // WXAI
    '0x1e3769bd5fb2e9e9e7d4ed8667c947661f9a82e3', // USDC
    '0xbee82cfdaff4a6aa4e4793cb81eb1c2e79ac463c', // WETH
  ],
  [
    '0x1e3769bd5fb2e9e9e7d4ed8667c947661f9a82e3', // USDC
  ],
  "0.0.6",
  2398999,

  // INCENTIVES PARAMS - EMPTY VALUES FOR UNSUPPORTED CHAIN
  "0x0000000000000000000000000000000000000000",
  "0x0000000000000000000000000000000000000000",
  0
)

const supportedChains = new SupportedChains(
  arbitrumOne,
  arbitrumSepolia,
  gravity,
  molten,
  proofOfPlay,
  rari,
  reya,
  sanko,
  xai
)

// Edit this for the given deployment
const TARGET_CHAIN: ChainInfo = supportedChains.arbitrumOne

export {
  TARGET_CHAIN,
  ARBITRUM_ONE
}