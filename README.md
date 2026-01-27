# Token Analyzer (Ethereum CLI)

A small CLI tool that reads and validates on-chain ERC-20 token data via an Ethereum RPC endpoint.

## What it does
- Detects network + chainId (helps prevent wrong-chain mistakes)
- Checks contract code exists at the given address
- Reads ERC-20: name, symbol, decimals, totalSupply

## Setup
```bash
npm install
cp .env.example .env
# set RPC_URL in .env

