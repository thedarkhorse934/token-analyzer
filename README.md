# 🧠 Token Analyzer (Ethereum CLI)

A lightweight **Node.js CLI tool** that reads and validates **ERC-20 token data directly from the Ethereum blockchain** using an RPC endpoint.

No scraping.  
No third-party APIs.  
Just **on-chain truth**. 🔗

---

## 🚀 What This Project Does

Given an Ethereum contract address, this tool:

✅ Connects to an Ethereum RPC  
✅ Detects the current network and chain ID  
✅ Verifies that contract code exists at the address  
✅ Reads ERC-20 metadata **directly from the smart contract**  

Specifically, it retrieves:

- 📛 Token name  
- 🏷️ Token symbol  
- 🔢 Decimals  
- 🧮 Total supply  

This project is intentionally small, focused, and correct — designed to demonstrate **on-chain data querying and validation**, not UI polish.

---

## 🛡️ Why This Matters

Blockchain addresses are **chain-specific**.

Querying a mainnet token on the wrong network silently produces bad data — a common and dangerous mistake in Web3 tooling.

This project avoids that by:

- 🌍 Detecting the connected network
- ⚠️ Refusing to proceed if the address is not a deployed contract
- 📡 Reading state **directly from the blockchain**, not cached services

It’s a foundation for:
- token analysis tools
- risk assessment
- portfolio trackers
- hackathon projects
- future DeFi tooling

---

## 🧰 Tech Stack

- **Node.js**
- **ethers.js**
- **Ethereum JSON-RPC**
- **CLI (command-line interface)**

---

## ⚙️ Setup

### 1️⃣ Install dependencies
```bash
npm install
 cp .env.example .env
```


