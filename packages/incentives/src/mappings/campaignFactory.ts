import { BigInt, Bytes } from "@graphprotocol/graph-ts";
import { 
  CampaignCreated,
  CampaignCanceled,
  CampaignPaused, 
  CampaignUnpaused,
  CampaignUpdated,
  CustomFeeUpdated,
  ProtocolFeeUpdated,
  TokenAllowedStatusUpdated,
  TokenMinIncentiveUpdated,
  CampaignFactory
} from '../../generated/campaignFactory/CampaignFactory';
import { 
  getOrCreateCampaignFactory,
  getOrCreateCampaign,
  getOrCreateUser, 
  getOrCreateToken
} from './helpers'
import { BPS_DIVISOR } from './constants'

export function handleCampaignCreated(event: CampaignCreated): void {
  let campaign = getOrCreateCampaign(event.params.campaignId.toString(), event.block.timestamp)
  let campaignFactoryContract = CampaignFactory.bind(event.address)
  let user = getOrCreateUser(event.params.creator, event.block.timestamp)
  let token = getOrCreateToken(event.params.token, event.block.timestamp)

  campaign.creator = user.id
  campaign.token = token.id
  campaign.pool = event.params.pool
  campaign.rewards = event.params.rewards
  campaign.status = "active"
  campaign.incentiveType = BigInt.fromI32(event.params.incentiveType)
  campaign.startTime = event.params.startTime
  campaign.endTime = event.params.endTime
  campaign.rewardsOptions = event.params.rewardsOptions
  campaign.createdAt = event.block.timestamp
  campaign.lastUpdated = event.block.timestamp

  let campaignAddressList: Array<Bytes> = []
  let addressList = campaignFactoryContract.getCampaignAddressList(event.params.campaignId)
  for (let i = 0; i < addressList.length; ++i) {
    campaignAddressList.push(addressList[i] as Bytes)
  }
  campaign.addressList = campaignAddressList

  campaign.save()
}

export function handleCampaignCanceled(event: CampaignCanceled): void {
  let campaign = getOrCreateCampaign(event.params.campaignId.toString(), event.block.timestamp)
  campaign.status = "cancelled"
  campaign.lastUpdated = event.block.timestamp

  campaign.save()
}

export function handleCampaignPaused(event: CampaignPaused): void {
  let campaign = getOrCreateCampaign(event.params.campaignId.toString(), event.block.timestamp)
  campaign.status = "paused"
  campaign.lastUpdated = event.block.timestamp

  campaign.save()
}

export function handleCampaignUnpaused(event: CampaignUnpaused): void {
  let campaign = getOrCreateCampaign(event.params.campaignId.toString(), event.block.timestamp)
  campaign.status = "active"
  campaign.lastUpdated = event.block.timestamp

  campaign.save()
}

export function handleCampaignUpdated(event: CampaignUpdated): void {
  let campaign = getOrCreateCampaign(event.params.campaignId.toString(), event.block.timestamp)
  let token = getOrCreateToken(event.params.token, event.block.timestamp)

  campaign.token = token.id
  campaign.rewards = event.params.rewards
  campaign.endTime = event.params.endTime
  campaign.lastUpdated = event.block.timestamp

  campaign.save()
}

export function handleCustomFeeUpdated(event: CustomFeeUpdated): void {
  let user = getOrCreateUser(event.params.user, event.block.timestamp)

  user.fee = event.params.fee.toBigDecimal().div(BPS_DIVISOR)
  user.lastUpdated = event.block.timestamp

  user.save()
}

export function handleProtocolFeeUpdated(event: ProtocolFeeUpdated): void {
  let campaignFactory = getOrCreateCampaignFactory(event.block.timestamp)

  campaignFactory.fee = event.params.fee.toBigDecimal().div(BPS_DIVISOR)
  campaignFactory.lastUpdated = event.block.timestamp

  campaignFactory.save()
}

export function handleTokenAllowedStatusUpdated(event: TokenAllowedStatusUpdated): void {
  let token = getOrCreateToken(event.params.token, event.block.timestamp)

  token.allowed = event.params.allowed
  token.lastUpdated = event.block.timestamp

  token.save()
}

export function handleTokenMinIncentiveUpdated(event: TokenMinIncentiveUpdated): void {
  let token = getOrCreateToken(event.params.token, event.block.timestamp)

  token.minimum = event.params.minIncentive
  token.lastUpdated = event.block.timestamp

  token.save()
}

