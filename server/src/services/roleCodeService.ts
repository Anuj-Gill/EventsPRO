import crypto from "crypto";

if (!process.env.CODE_SECRET) {
  throw new Error("Environment variable CODE_SECRET is not set");
}

const secretKey = crypto
  .createHash("sha256") // Hash to ensure 32 bytes
  .update(String(process.env.CODE_SECRET))
  .digest();

export default function decrypt(code: string) {
  const [ivBase64, encryptedData] = code.split(":");
  const algorithm = "aes-256-cbc";
  const decipher = crypto.createDecipheriv(
    algorithm,
    secretKey,
    Buffer.from(ivBase64, "base64"),
  );
  let decrypted = decipher.update(encryptedData, "base64", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}
