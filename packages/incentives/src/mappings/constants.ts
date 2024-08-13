import { TARGET_CHAIN } from 'common'
import { BigDecimal } from '@graphprotocol/graph-ts/index'

const CAMPAIGN_FACTORY_ADDRESS = TARGET_CHAIN.campaignFactory
const DISTRIBUTOR_ADDRESS = TARGET_CHAIN.distributor

let BPS_DIVISOR = BigDecimal.fromString("10000");

export {
  CAMPAIGN_FACTORY_ADDRESS,
  DISTRIBUTOR_ADDRESS,
  BPS_DIVISOR
}
