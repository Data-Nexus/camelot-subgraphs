# Camelot Incentives Campaigns Subgraph

This subgraph dynamically tracks all campaigns for Camelot's incentives framework.


## Building & Deploying

Make sure to edit `TARGET_CHAIN` in `src/config/chains.js` to point to the correct chain before running anything. New chains must be declared in `SupportedChains` and declared as a new `ChainInfo` class to satisfy graph's Assembly Script type checking.

`yarn set-config`
`yarn codegen`
`yarn build`
`yarn deploy`