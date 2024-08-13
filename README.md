# Camelot Subgraphs Master 

## Subgraphs List
- AMM V2
- AMM v3
- Blocks
- Incentives

## Building & Deploying
Declare env vars

```
// chain ID for given deployment
chainId=

// new subgraph version to deploy (edit this in deployAll.ts for each subgraph, will eventually improve this flow)
version=

// subgraph deploy key
deployKey
```

Deploy all subgraphs to given network
`pnpm run deploy-all-prod` or `pnpm run deploy-all-dev`

Comment out the deployments in `deployAll.ts` to skip.

All individual build, codegen, etc commands can be run for individual subgraphs from the top level using `pnpm run` or by invoking them from within the sub repos directly. 
