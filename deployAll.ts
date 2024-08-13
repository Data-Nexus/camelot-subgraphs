import { execSync } from 'child_process'
import fs from "fs"
import process from 'process'

const chainId = process.env.chainId

const chainConfigRaw = fs.readFileSync("./packages/common/chainConfig.json", "utf-8")
const chainConfig = JSON.parse(chainConfigRaw)

const parsedChainId = chainId ? parseInt(chainId) : undefined;
const chain = parsedChainId ? chainConfig.find(chain => chain.id === parsedChainId) : undefined;

console.log(`\n${(new Date(Date.now())).toLocaleString()}\n\n`)
console.log(`⏳ Deploying to ${chainId}...`)

console.log('\n.::AMM V2::.\n¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨')
process.env.name = `camelot-ammv2-${chain.verboseId}`
execSync('pnpm --filter amm-v2 exec set-config', {stdio: 'inherit'})
execSync('pnpm --filter amm-v2 run codegen', {stdio: 'inherit'})
execSync('pnpm --filter amm-v2 run deploy', {stdio: 'inherit'})

console.log('\n.::AMM V3::.\n¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨')
process.env.name = `camelot-ammv3-${chain.verboseId}`
execSync('pnpm --filter amm-v3 exec set-config', {stdio: 'inherit'})
execSync('pnpm --filter amm-v3 run codegen', {stdio: 'inherit'})
execSync('pnpm --filter amm-v3 run deploy', {stdio: 'inherit'})

console.log('\n.::BLOCKS::.\n¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨')
process.env.name = `camelot-blocks-${chain.verboseId}`
execSync('pnpm --filter blocks exec set-config', {stdio: 'inherit'})
execSync('pnpm --filter blocks run codegen', {stdio: 'inherit'})
execSync('pnpm --filter blocks run deploy', {stdio: 'inherit'})

console.log('\n.::INCENTIVES::.\n¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨')
process.env.name = `camelot-incentives-${chain.verboseId}`
execSync('pnpm --filter incentives exec set-config', {stdio: 'inherit'})
execSync('pnpm --filter incentives run codegen', {stdio: 'inherit'})
execSync('pnpm --filter incentives run deploy', {stdio: 'inherit'})