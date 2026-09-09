

export const PLAIN_KEY = "user_plain_pw";
export const HASH_KEY = "user_hash_pw";

export function generatePassword(length = 16) {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+=-";
  const arr = new Uint32Array(length);
  crypto.getRandomValues(arr);
  return Array.from(arr, (v) => chars[v % chars.length]).join("");
}

export async function sha256Hex(message) {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function saveToLocal(plain, hash) {
  try {
    localStorage.setItem(PLAIN_KEY, plain);
    localStorage.setItem(
      HASH_KEY,
      JSON.stringify({ hash, savedAt: new Date().toISOString() }),
    );
  } catch (err) {
    console.error("LocalStorage Error:", err);
  }
}

export async function generateAndSavePassword() {
  const plain = generatePassword(16);
  const hash = await sha256Hex(plain);
  saveToLocal(plain, hash);
  return { plain, hash };
}



