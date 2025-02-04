# Camelot Subgraphs Master 

## Subgraphs List
- AMMv2
- AMMv3
- AMMv4
- Blocks
- Incentives

## Building & Deploying
Declare env vars

```
// chain ID for given deployment
CHAIN_ID=

// subgraph versions to deploy
VERSION_AMMV2=
VERSION_AMMV3=
VERSION_AMMV4=
VERSION_BLOCKS=

// subgraph deploy key
DEPLOY_KEY=
```

Deploy a subgraph to given network
`pnpm run deploy-<subgraph_name>`

All individual build, codegen, etc commands can be run for individual subgraphs from the top level using `pnpm run` or by invoking them from within the sub repos directly:

1) Fetch chain list config:
```
pnpm run get-config-common-dev 
or
pnpm run get-config-common-prod
```
2) Write the subgraph config to `packages/xxx/subgraph.yaml`:
```
pnpm run set-config-<subgraph_name>
```
3) Generate subgraph artifacts:
```
pnpm run codegen-<subgraph_name>
```
4) Build the subgraph:
```
pnpm run build-<subgraph_name>
```
5) Deploy the subgraph:
```
pnpm run deploy-<subgraph_name>
```

## Manual deployments

Alternatively, you can also use manual commands inside every subrepo via the following:
```
pnpm --filter <package> exec graph deploy [...]
```