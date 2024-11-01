import { 
  Claimed,
  DistributorPaused,
  DistributorUnpaused,
  RootUpdated
} from '../../generated/distributor/Distributor';
import { Claim } from '../../generated/schema'
import { 
  getOrCreateDistributor,
  getOrCreateToken,
  getOrCreateUser,
  pow10
} from './helpers'

export function handleClaimed(event: Claimed): void {
  let token = getOrCreateToken(event.params.token, event.block.timestamp)
  let user = getOrCreateUser(event.params.user, event.block.timestamp)
  let claim = new Claim(event.transaction.hash.concatI32(event.logIndex.toI32()))

  claim.user = user.id
  claim.pool = event.params.pool
  claim.token = token.id
  claim.amount = event.params.amount.toBigDecimal().div(pow10(token.decimals))
  claim.accAmount = event.params.accAmount.toBigDecimal().div(pow10(token.decimals))
  claim.timestamp = event.block.timestamp
  claim.txHash = event.transaction.hash
  claim.positionIdentifier = event.params.identifier

  claim.save()
}

export function handleDistributorPaused(event: DistributorPaused): void {
  let distributor = getOrCreateDistributor(event.block.timestamp)

  distributor.paused = true
  distributor.lastUpdated = event.block.timestamp

  distributor.save()
}

export function handleDistributorUnpaused(event: DistributorUnpaused): void {
  let distributor = getOrCreateDistributor(event.block.timestamp)

  distributor.paused = false
  distributor.lastUpdated = event.block.timestamp

  distributor.save()
}

export function handleRootUpdated(event: RootUpdated): void {
  let distributor = getOrCreateDistributor(event.block.timestamp)

  distributor.root = event.params.root
  distributor.lastUpdated = event.block.timestamp

  distributor.save()
}

