import {BigDecimal, BigInt, Address} from "@graphprotocol/graph-ts";
import { CAMPAIGN_FACTORY_ADDRESS, DISTRIBUTOR_ADDRESS } from './constants'
import { CampaignFactory, Campaign, Distributor, User, Token } from '../../generated/schema'
import { ERC20 } from '../../generated/campaignFactory/ERC20'

export function pow10(decimals: BigInt): BigDecimal {
  let bd = BigDecimal.fromString('1')
  for (let i = BigInt.fromI32(0); i.lt(decimals as BigInt); i = i.plus(BigInt.fromI32(1))) {
    bd = bd.times(BigDecimal.fromString('10'))
  }
  return bd
}

export function getOrCreateDistributor(blockTime: BigInt): Distributor {
  let distributor = Distributor.load(DISTRIBUTOR_ADDRESS)
  if (distributor === null) {
    distributor = new Distributor(DISTRIBUTOR_ADDRESS)
    distributor.paused = false
    distributor.lastUpdated = blockTime
    distributor.save()
  }
  return distributor
}

export function getOrCreateCampaignFactory(blockTime: BigInt): CampaignFactory {
  let distributor = getOrCreateDistributor(blockTime)
  let campaignFactory = CampaignFactory.load(CAMPAIGN_FACTORY_ADDRESS)
  if (campaignFactory === null) {
    campaignFactory = new CampaignFactory(CAMPAIGN_FACTORY_ADDRESS)
    campaignFactory.distributor = distributor.id
    campaignFactory.fee = new BigDecimal(BigInt.fromI32(4))
    campaignFactory.lastUpdated = blockTime
    campaignFactory.save()
  }
  return campaignFactory
}

export function getOrCreateCampaign(campaignId: string, blockTime: BigInt): Campaign {
  let campaign = Campaign.load(campaignId)
  if (campaign === null) {
    campaign = new Campaign(campaignId)
    campaign.lastUpdated = blockTime
  }
  return campaign
}

export function getOrCreateUser(address: Address, blockTime: BigInt): User {
  let user = User.load(address.toHexString())
  if (user === null) {
    user = new User(address.toHexString())
    user.fee = new BigDecimal(BigInt.fromI32(0))
    user.lastUpdated = blockTime
    user.save()
  }
  return user
}

export function getOrCreateToken(address: Address, blockTime: BigInt): Token {
  let token = Token.load(address.toHexString())
  if (token === null) {
    token = new Token(address.toHexString())

    let contract = ERC20.bind(address)

    let nameValue = ''
    let nameResult = contract.try_name()
    if (!nameResult.reverted) {
      nameValue = nameResult.value
    }

    let symbolValue = ''
    let symbolResult = contract.try_symbol()
    if (!symbolResult.reverted) {
      symbolValue = symbolResult.value
    }

    let decimalValue = BigInt.fromString('0')
    let decimalResult = contract.try_decimals()
    if (!decimalResult.reverted) {
      decimalValue = BigInt.fromI32(decimalResult.value)
    }

    token.name = nameValue
    token.symbol = symbolValue
    token.decimals = decimalValue
    token.allowed = true
    token.minimum = new BigDecimal(BigInt.fromI32(0))
    token.lastUpdated = blockTime
    
    token.save()
  }
  return token
}