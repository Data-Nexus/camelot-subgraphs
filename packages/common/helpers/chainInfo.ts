let ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'
class ChainInfo {
  // UNIVERSAL SELECTED CHAIN PARAM - USED FOR `network` IN `subgraph.yaml`
  network: string;

  // AMM V2 PARAMS
  ammv2Name: string;
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
  ammv3Name: string;
  factoryV3: string;
  nftPositionManager: string;
  wrappedNativeV3: string;
  wrappedNativeUSDCPoolV3: string;
  minimumLiquidityThresholdETHV3: string;
  whitelistTokensV3: string[];
  stableCoins: string[];
  apiVersion: string;
  startBlockAmmV3: number;

  // BLOCKS PARAMS
  blocksName: string;

  // INCENTIVES PARAMS
  incentivesName: string;
  campaignFactory: string;
  distributor: string;
  startBlockIncentives: number;

  constructor(
    // UNIVERSAL SELECTED CHAIN PARAM - USED FOR `network` IN `subgraph.yaml`
    network: string,

    // AMM V2 PARAMS
    ammv2Name: string,
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
    ammv3Name: string,
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
    incentivesName: string,
    campaignFactory: string,
    distributor: string,
    startBlockIncentives: number,

    // BLOCKS PARAMS
    blocksName: string,
  ) {
    // UNIVERSAL SELECTED CHAIN PARAM - USED FOR `network` IN `subgraph.yaml`
    this.network = network.toLowerCase()

    // AMM V2 PARAMS
    this.ammv2Name = ammv2Name
    this.factoryV2 = factoryV2 ? factoryV2.toLowerCase() : ZERO_ADDRESS
    this.wrappedNativeV2 = wrappedNativeV2 ? wrappedNativeV2.toLowerCase() : ZERO_ADDRESS
    this.wrappedNativeUSDCPoolV2 = wrappedNativeUSDCPoolV2 ? wrappedNativeUSDCPoolV2.toLowerCase() : ZERO_ADDRESS
    this.whitelistTokensV2 = whitelistTokensV2 ? whitelistTokensV2.map<string>((t: string): string => t.toLowerCase()) : []
    this.stableCoin = stableCoin ? stableCoin.toLowerCase() : ZERO_ADDRESS
    this.minimumUSDThresholdNewPairs = minimumUSDThresholdNewPairs
    this.minimumLiquidityThresholdETHV2 = minimumLiquidityThresholdETHV2
    this.minimumLiquidityETH = minimumLiquidityETH
    this.startBlockAmmV2 = startBlockAmmV2

    // AMM V3 PARAMS
    this.ammv3Name = ammv3Name
    this.factoryV3 = factoryV3 ? factoryV3.toLowerCase() : ZERO_ADDRESS
    this.nftPositionManager = nftPositionManager ? nftPositionManager.toLowerCase() : ZERO_ADDRESS
    this.wrappedNativeV3 = wrappedNativeV3 ? wrappedNativeV3.toLowerCase() : ZERO_ADDRESS
    this.wrappedNativeUSDCPoolV3 = wrappedNativeUSDCPoolV3 ? wrappedNativeUSDCPoolV3.toLowerCase() : ZERO_ADDRESS
    this.minimumLiquidityThresholdETHV3 = minimumLiquidityThresholdETHV3
    this.whitelistTokensV3 = whitelistTokensV3 ? whitelistTokensV3.map<string>((t: string): string => t.toLowerCase()) : []
    this.stableCoins = stableCoins ? stableCoins.map<string>((t: string): string => t.toLowerCase()) : []
    this.apiVersion = apiVersion
    this.startBlockAmmV3 = startBlockAmmV3

    // INCENTIVES PARAMS
    this.incentivesName = incentivesName
    this.campaignFactory = campaignFactory ? campaignFactory.toLowerCase() : ZERO_ADDRESS
    this.distributor = distributor ? distributor.toLowerCase() : ZERO_ADDRESS
    this.startBlockIncentives = startBlockIncentives

    // BLOCKS PARAMS
    this.blocksName = blocksName
  }
}

export default ChainInfo