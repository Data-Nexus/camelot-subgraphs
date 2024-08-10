import {BigInt, store} from '@graphprotocol/graph-ts'

import {
     ethereum
} from "@graphprotocol/graph-ts"

import {
    Block, Bundle
} from "../../generated/schema"

const MAX_BLOCK_INTERVAL_TS = BigInt.fromI32(30 * 60) // 1h

export function handleBlock(block: ethereum.Block): void {
    let id = block.hash.toHex()
    let blockEntity = new Block(id);
    blockEntity.number = block.number;
    blockEntity.timestamp = block.timestamp;
    blockEntity.parentHash = block.parentHash.toHex();
    blockEntity.author = block.author.toHex();
    blockEntity.difficulty = block.difficulty;
    blockEntity.totalDifficulty = block.totalDifficulty;
    blockEntity.gasUsed = block.gasUsed;
    blockEntity.gasLimit = block.gasLimit;
    blockEntity.receiptsRoot = block.receiptsRoot.toHex();
    blockEntity.transactionsRoot = block.transactionsRoot.toHex();
    blockEntity.stateRoot = block.stateRoot.toHex();
    blockEntity.size = block.size;
    blockEntity.unclesHash = block.unclesHash.toHex();
    blockEntity.save();

    let prev_bundle = Bundle.load('0')
    if(!prev_bundle) {
        prev_bundle = new Bundle('0')
        prev_bundle.block = blockEntity.id
        prev_bundle.save()
        return
    }

    let current_bundle = Bundle.load('1')
    if(!current_bundle) {
        current_bundle = new Bundle('1')
        current_bundle.block = blockEntity.id
        current_bundle.save()
        return
    }

    let prev_bundle_block = Block.load(prev_bundle.block)!
    if(blockEntity.timestamp.minus(prev_bundle_block.timestamp).gt(MAX_BLOCK_INTERVAL_TS)){
        prev_bundle.block = current_bundle.block
    } else {
        store.remove('Block', current_bundle.block)
    }

    current_bundle.block = blockEntity.id

    prev_bundle.save()
    current_bundle.save()
  }