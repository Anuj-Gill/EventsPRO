import crypto from "crypto";
import { promisify } from "util";

// Ensure the environment variable is set
if (!process.env.CODE_SECRET) {
  throw new Error("Environment variable CODE_SECRET is not set");
}

// Utility to generate a SHA-256 hash as a key
async function generateKey(secret: string): Promise<Buffer> {
  return crypto.createHash("sha256").update(secret).digest();
}

// Utility to generate an MD5 hash as an IV
async function generateIV(secret: string): Promise<Buffer> {
  return crypto.createHash("md5").update(secret).digest();
}

// Asynchronous encrypt function with 10-character output
async function encrypt(
  email: string,
): Promise<{ fullEncrypted: string; shortEncrypted: string }> {
  const algorithm = "aes-256-cbc";
  const secret = String(process.env.CODE_SECRET);

  // Generate key and IV
  const key = await generateKey(secret);
  const iv = await generateIV(secret);

  // Create Cipher instance
  const cipher = crypto.createCipheriv(algorithm, key, iv);

  // Encrypt the email
  let encrypted = cipher.update(email, "utf8", "base64");
  encrypted += cipher.final("base64");

  // Combine IV and encrypted data, then shorten to 10 characters
  const result = `${iv.toString("base64")}:${encrypted}`;
  return {
    fullEncrypted: result, // Full encrypted string (for decryption or storage)
    shortEncrypted: result.slice(0, 10), // First 10 characters of the encrypted output
  };
}

// Export the function for use in other modules
export default encrypt;
