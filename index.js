
/**
 * Token Analyzer (Ethereum)
 * -------------------------
 * Input: ERC20 contract address
 * Output: basic token metadata + safety checks
 *
 * Learned:
 * - Ethereum RPC calls
 * - Reading ERC20 contracts
 * - Environment variables (.env)
 * - Handling non-contract addresses
 */


import 'dotenv/config';
import { ethers } from 'ethers';

console.log("Token analyzer starting...");
console.log("Args:", process.argv.slice(2));

const RPC_URL = process.env.RPC_URL;
if (!RPC_URL) {
  console.error("Missing RPC_URL in .env");
  process.exit(1);
}

const address = process.argv[2];
if (!address) {
  console.log("Usage: node index.js <token_contract_address>");
  process.exit(1);
}

const ERC20_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)"
];

const main = async () => {
  const provider = new ethers.JsonRpcProvider(RPC_URL);
	const network = await provider.getNetwork();
	console.log("Network:", network.name, `(chainId: ${network.chainId})`);


  // NEW: check contract code exists
  const code = await provider.getCode(address);
  if (code === "0x") {
    console.log("⚠️ No contract code found at this address");
    process.exit(0);
  }

  if (!ethers.isAddress(address)) {
    console.error("Not a valid Ethereum address");
    process.exit(1);
  }

  const token = new ethers.Contract(address, ERC20_ABI, provider);

  const safeCall = async (fn, fallback = "N/A") => {
    try { return await fn(); } catch { return fallback; }
  };

  const name = await safeCall(() => token.name());
  const symbol = await safeCall(() => token.symbol());
  const decimals = await safeCall(() => token.decimals(), null);
  const totalSupplyRaw = await safeCall(() => token.totalSupply(), null);

  console.log("Token:", address);
  console.log("Name:", name);
  console.log("Symbol:", symbol);
  console.log("Decimals:", decimals?.toString?.() ?? decimals);
;

const flags = [];

	// Metadata missing / weird
	if (name === "N/A" || String(name).trim() === "") flags.push("Missing token name()");
	if (symbol === "N/A" || String(symbol).trim() === "") flags.push("Missing token symbol()");
	if (decimals == null) flags.push("Missing decimals()");
	if (typeof decimals === "number" && (decimals === 0 || decimals > 18)) flags.push(`Unusual decimals: ${decimals}`);

	// Supply sanity (very rough)
	if (decimals != null && totalSupplyRaw != null) {
  const supply = Number(ethers.formatUnits(totalSupplyRaw, decimals));
  if (Number.isFinite(supply) && supply > 1e15) flags.push("Extremely large total supply");
}

if (flags.length) {
  console.log("\nFlags:");
  for (const f of flags) console.log("-", f);
} else {
  console.log("\nFlags: none");
}


  if (decimals != null && totalSupplyRaw != null) {
    console.log(
      "Total Supply:",
      ethers.formatUnits(totalSupplyRaw, decimals)
    );
  } else {
    console.log("Total Supply:", totalSupplyRaw);
  }
};

main().catch((err) => {
  console.error("Unexpected error:", err.message);
  process.exit(1);
});


