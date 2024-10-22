import TARGET_CHAIN from "common/generated/targetChain"
import fs from "fs"
import { fileURLToPath } from 'url'
import path from "path"
import {execSync} from "child_process"
import dotenv from "dotenv"

const getCurrentDir = () => {
  const __filename = fileURLToPath(import.meta.url)
  return path.dirname(__filename)
}
const currentDir = getCurrentDir()
dotenv.config({ path: path.resolve(currentDir, '../../.env') });

const version = JSON.parse(fs.readFileSync("package.json", "utf-8")).version

let ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

if (TARGET_CHAIN.factoryV3 === ZERO_ADDRESS) throw new Error(`AMM V3: missing factory contract for ${TARGET_CHAIN.network}`)
if (TARGET_CHAIN.nftPositionManager === ZERO_ADDRESS) throw new Error(`AMM V3: missing NFT position manager contract for ${TARGET_CHAIN.network}`)
if (TARGET_CHAIN.wrappedNativeV3 === ZERO_ADDRESS) throw new Error(`AMM V3: missing wrapped native contract for ${TARGET_CHAIN.network}`)
if (TARGET_CHAIN.wrappedNativeUSDCPoolV3 === ZERO_ADDRESS) throw new Error(`AMM V3: missing wrapped native USDC pool contract for ${TARGET_CHAIN.network}`)
if (TARGET_CHAIN.stableCoins.length === 0) throw new Error(`AMM V3: missing stablecoin contract for ${TARGET_CHAIN.network}`)

execSync(`graph deploy ${TARGET_CHAIN.ammv3Name} --version-label ${version} --node https://subgraphs.alchemy.com/api/subgraphs/deploy --deploy-key ${process.env.DEPLOY_KEY} --ipfs https://ipfs.satsuma.xyz`, { stdio: 'inherit' })