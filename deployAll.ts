import { exec } from 'child_process'
import util from 'util'
import fs from "fs"
import process from 'process'
import dotenv from 'dotenv';

dotenv.config();
const execPromise = util.promisify(exec)

const CHAIN_ID = process.env.CHAIN_ID || "42161"

const chainConfigRaw = fs.readFileSync("./packages/common/generated/chainConfig.json", "utf-8")
const chainConfig = JSON.parse(chainConfigRaw)

const chain = chainConfig.find(chain => parseInt(chain.id) === parseInt(CHAIN_ID))
console.log(`\n${(new Date(Date.now())).toLocaleString()}\n\n`)
console.log(`⏳ Deploying to ${CHAIN_ID}...`)

console.log('\n.::AMM V2::.\n¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨')
process.env.name = `camelot-ammv2-${chain.verboseId}`
process.env.version = ""

execPromise('pnpm --filter amm-v2 run set-config')
.then(({stdout}) => console.log(stdout))
.then(() => execPromise('pnpm --filter amm-v2 run codegen'))
.then(({stdout}) => console.log(stdout))
.then(() => execPromise('pnpm --filter amm-v2 run deploy'))
.then(({stdout}) => console.log(stdout))
.catch(e => console.log("AMM V2 DEPLOY FAILED", e))

.then(() => {
  console.log('\n.::AMM V3::.\n¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨')
  return execPromise('pnpm --filter amm-v3 run set-config')
})
.then(({stdout}) => console.log(stdout))
.then(() => execPromise('pnpm --filter amm-v3 run codegen'))
.then(({stdout}) => console.log(stdout))
.then(() => execPromise('pnpm --filter amm-v3 run deploy'))
.then(({stdout}) => console.log(stdout))
.catch(e => console.log("AMM V3 DEPLOY FAILED", e))

.then(() => {
  console.log('\n.::BLOCKS::.\n¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨')
  return execPromise('pnpm --filter blocks run set-config')
})
.then(({stdout}) => console.log(stdout))
.then(() => execPromise('pnpm --filter blocks run codegen'))
.then(({stdout}) => console.log(stdout))
.then(() => execPromise('pnpm --filter blocks run deploy'))
.then(({stdout}) => console.log(stdout))
.catch(e => console.log("BLOCKS DEPLOY FAILED", e))

.then(() => {
  console.log('\n.::INCENTIVES::.\n¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨')
  return execPromise('pnpm --filter incentives run set-config')
})
.then(({stdout}) => console.log(stdout))
.then(() => execPromise('pnpm --filter incentives run codegen'))
.then(({stdout}) => console.log(stdout))
.then(() => execPromise('pnpm --filter incentives run deploy'))
.then(({stdout}) => console.log(stdout))
.catch(e => console.log("INCENTIVES DEPLOY FAILED", e))