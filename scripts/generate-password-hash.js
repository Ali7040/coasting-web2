/**
 * Run this ONCE to generate your password hash.
 * Do NOT share this script output publicly.
 *
 * Usage:
 *   node scripts/generate-password-hash.js yourPasswordHere
 *
 * Copy the output into your Vercel environment variables and .env.local
 */

const crypto = require("crypto");

const password = process.argv[2];
const salt = process.argv[3] || "coasting2026";

if (!password) {
  console.error("Usage: node scripts/generate-password-hash.js <password> [salt]");
  process.exit(1);
}

const hash = crypto
  .createHash("sha256")
  .update(password + salt)
  .digest("hex");

const sessionSecret = crypto.randomBytes(32).toString("hex");

console.log("\n=== Coasting Properties — Environment Variables ===\n");
console.log("Add ALL of these to Vercel → Settings → Environment Variables:\n");
console.log(`ANTHROPIC_API_KEY=sk-ant-YOUR_KEY_HERE`);
console.log(`REACT_APP_PASSWORD_HASH=${hash}`);
console.log(`REACT_APP_SALT=${salt}`);
console.log(`REACT_APP_SESSION_SECRET=${sessionSecret}`);
console.log(`SESSION_SECRET=${sessionSecret}`);
console.log("\nAlso create .env.local in project root with the REACT_APP_* variables.");
console.log("\n⚠️  Never commit .env.local to git. It is already in .gitignore.\n");
