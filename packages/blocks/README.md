# BLOCKS-SUBGRAPH
Blocks subgraph to deploy on every Orbit chain. This is used by Camelot api-sync worker and analytics to fetch historical data.
This version only synchronizes one block per 30mn in order to optimize the amount of stored entities.

## Configure chain name
Edit subgraph.yaml to replace the `network` field with the right chain identifier.

## Build and deploy subgraph

```bash
# generate code
$ npx graph codegen

# build
$ npx graph build

# deploy
$ npx graph deploy <deployment_params>
```