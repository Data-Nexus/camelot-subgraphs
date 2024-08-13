class ChainInfo {
  // UNIVERSAL SELECTED CHAIN PARAM - USED FOR `network` IN `subgraph.yaml`
  network: string;

  // AMM V2 PARAMS
  factoryV2: string;
  wrappedNativeV2: string;
  wrappedNativeUSDCPoolV2: string;
  whitelistTokensV2: Array<string>;
  stableCoin: string;
  minimumUSDThresholdNewPairs: string;
  minimumLiquidityThresholdETHV2: string;
  minimumLiquidityETH: string;
  startBlockAmmV2: number;

  // AMM V3 PARAMS
  factoryV3: string;
  nftPositionManager: string;
  wrappedNativeV3: string;
  wrappedNativeUSDCPoolV3: string;
  minimumLiquidityThresholdETHV3: string;
  whitelistTokensV3: string[];
  stableCoins: string[];
  apiVersion: string;
  startBlockAmmV3: number;

  // BLOCKS PARAMS - ONLY USES `network`

  // INCENTIVES PARAMS
  campaignFactory: string;
  distributor: string;
  startBlockIncentives: number;

  constructor(
    // UNIVERSAL SELECTED CHAIN PARAM - USED FOR `network` IN `subgraph.yaml`
    network: string,

    // AMM V2 PARAMS
    factoryV2: string,
    wrappedNativeV2: string,
    wrappedNativeUSDCPoolV2: string,
    whitelistTokensV2: Array<string>,
    stableCoin: string,
    minimumUSDThresholdNewPairs: string,
    minimumLiquidityThresholdETHV2: string,
    minimumLiquidityETH: string,
    startBlockAmmV2: number,

    // AMM V3 PARAMS
    factoryV3: string,
    nftPositionManager: string,
    wrappedNativeV3: string,
    wrappedNativeUSDCPoolV3: string,
    minimumLiquidityThresholdETHV3: string,
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
    this.network = network.toLowerCase()

    // AMM V2 PARAMS
    this.factoryV2 = factoryV2.toLowerCase()
    this.wrappedNativeV2 = wrappedNativeV2.toLowerCase()
    this.wrappedNativeUSDCPoolV2 = wrappedNativeUSDCPoolV2.toLowerCase()
    this.whitelistTokensV2 = whitelistTokensV2.map<string>((t: string): string => t.toLowerCase())
    this.stableCoin = stableCoin.toLowerCase()
    this.minimumUSDThresholdNewPairs = minimumUSDThresholdNewPairs
    this.minimumLiquidityThresholdETHV2 = minimumLiquidityThresholdETHV2
    this.minimumLiquidityETH = minimumLiquidityETH
    this.startBlockAmmV2 = startBlockAmmV2

    // AMM V3 PARAMS
    this.factoryV3 = factoryV3.toLowerCase()
    this.nftPositionManager = nftPositionManager.toLowerCase()
    this.wrappedNativeV3 = wrappedNativeV3.toLowerCase()
    this.wrappedNativeUSDCPoolV3 = wrappedNativeUSDCPoolV3.toLowerCase()
    this.minimumLiquidityThresholdETHV3 = minimumLiquidityThresholdETHV3
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

export default ChainInfo