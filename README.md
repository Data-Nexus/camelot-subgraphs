# Camelot Subgraphs Master 

## Subgraphs List
- AMM V2
- AMM v3
- Blocks
- Incentives

## Building & Deploying
Make sure to edit `TARGET_CHAIN` in `config/chains.js` to point to the correct chain. New chains must be declared in `SupportedChains` and declared as a new `ChainInfo` class to satisfy graph's Assembly Script type checking.

Set chain config for all subgraphs
```yarn set-config```

Codegen all subgraphs
```yarn codegen```

Build all subgraphs
```yarn build```

Deploy all subgraphs
```yarn deploy```

All commands can be run for individual subgraphs if we don't want to run them all at once. Reference top level `package.json`.