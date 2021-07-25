const crypto = require("crypto");

function sha256(input) {
  const hash = crypto.createHash("sha256");
  hash.update(input);
  return hash.digest("hex");
}

export function gameResult(seed, salt) {
  const nBits = 52; // number of most significant bits to use

  // 1. HMAC_SHA256(key=salt, message=seed)
  const hmac = crypto.createHmac("sha256", salt);
  hmac.update(seed);
  seed = hmac.digest("hex");

  // 2. r = 52 most significant bits
  seed = seed.slice(0, nBits / 4);
  const r = parseInt(seed, 16);

  // 3. X = r / 2^52
  let X = r / Math.pow(2, nBits); // uniformly distributed in [0; 1)

  // 4. X = 99 / (1-X)
  X = 99 / (1 - X);

  // 5. return max(trunc(X), 100)
  const result = Math.floor(X);
  return Math.max(1, result / 100);
}

export function hashChain(seed, limit = 100) {
  const rounds = [];

  for (let i = 0; i < limit; i++) {
    rounds.push(seed);
    seed = sha256(seed);
  }

  return rounds;
}
