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
CHAIN_ID=

// new subgraph version to deploy (edit this in deployAll.ts for each subgraph, will eventually improve this flow)
VERSION=

// subgraph deploy key
DEPLOY_KEY=
```

Deploy all subgraphs to given network
`pnpm run deploy-all-prod` or `pnpm run deploy-all-dev`

Comment out the deployments in `deployAll.ts` to skip.

All individual build, codegen, etc commands can be run for individual subgraphs from the top level using `pnpm run` or by invoking them from within the sub repos directly:

1) Fetch chain list config:
```
pnpm run get-config-common-dev 
or
pnpm run get-config-common-prod
```
2) Write the subgraph config to `packages/xxx/subgraph.yaml`:
```
pnpm run set-config-ammv2
```
3) Generate subgraph artifacts:
```
pnpm run codegen-ammv2
```
4) Build the subgraph:
```
pnpm run build-ammv2
```
5) Deploy the subgraph:
```
pnpm run deploy-ammv2
```