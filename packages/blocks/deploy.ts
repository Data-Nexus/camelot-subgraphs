import TARGET_CHAIN from "common/generated/targetChain"
import fs from "fs"
import {execSync} from "child_process"

const version = JSON.parse(fs.readFileSync("package.json", "utf-8")).version

execSync(`graph deploy ${TARGET_CHAIN.blocksName} --version-label ${version} --node https://subgraphs.alchemy.com/api/subgraphs/deploy --deploy-key ${process.env.DEPLOY_KEY} --ipfs https://ipfs.satsuma.xyz`, { stdio: 'inherit' })