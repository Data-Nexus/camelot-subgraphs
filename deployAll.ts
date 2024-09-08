import { execSync } from 'child_process'
import fs from "fs"
import process from 'process'
import dotenv from 'dotenv';

dotenv.config();

const CHAIN_ID = process.env.CHAIN_ID || "42161"

const chainConfigRaw = fs.readFileSync("./packages/common/generated/chainConfig.json", "utf-8")
const chainConfig = JSON.parse(chainConfigRaw)

const chain = chainConfig.find(chain => parseInt(chain.id) === parseInt(CHAIN_ID))
console.log(`\n${(new Date(Date.now())).toLocaleString()}\n\n`)
console.log(`⏳ Deploying to ${CHAIN_ID}...`)

console.log('\n.::AMM V2::.\n¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨')
process.env.name = `camelot-ammv2-${chain.verboseId}`
process.env.version = ""
execSync('pnpm --filter amm-v2 exec set-config', {stdio: 'inherit'})
execSync('pnpm --filter amm-v2 run codegen', {stdio: 'inherit'})
execSync('pnpm --filter amm-v2 run deploy', {stdio: 'inherit'})

console.log('\n.::AMM V3::.\n¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨')
process.env.name = `camelot-ammv3-${chain.verboseId}`
process.env.version = ""
execSync('pnpm --filter amm-v3 exec set-config', {stdio: 'inherit'})
execSync('pnpm --filter amm-v3 run codegen', {stdio: 'inherit'})
execSync('pnpm --filter amm-v3 run deploy', {stdio: 'inherit'})

console.log('\n.::BLOCKS::.\n¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨')
process.env.name = `camelot-blocks-${chain.verboseId}`
process.env.version = ""
execSync('pnpm --filter blocks exec set-config', {stdio: 'inherit'})
execSync('pnpm --filter blocks run codegen', {stdio: 'inherit'})
execSync('pnpm --filter blocks run deploy', {stdio: 'inherit'})

console.log('\n.::INCENTIVES::.\n¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨')
process.env.name = `camelot-incentives-${chain.verboseId}`
process.env.version = ""
execSync('pnpm --filter incentives exec set-config', {stdio: 'inherit'})
execSync('pnpm --filter incentives run codegen', {stdio: 'inherit'})
execSync('pnpm --filter incentives run deploy', {stdio: 'inherit'})