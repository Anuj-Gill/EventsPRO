import jwt, { JwtPayload, SignOptions, JsonWebTokenError } from "jsonwebtoken";

interface JwtData {
  email: string;
  roleCode: string;
}

export function createJwt(data: JwtData): string | undefined {
  try {
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) throw new Error("Secret key not defined");

    const token = jwt.sign(data, secretKey, {
      algorithm: "HS256",
    } as SignOptions);

    return token;
  } catch (error) {
    console.error("Error creating JWT: ", error);
  }
}

export async function verifyJwt(
  token: string,
): Promise<{ payload?: JwtPayload; error?: JsonWebTokenError }> {
  try {
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) throw new Error("Secret key not defined!");

    const payload = jwt.verify(token, secretKey) as JwtPayload;
    return { payload };
  } catch (error) {
    console.error("Authentication failed:", error);
    if (error instanceof JsonWebTokenError) {
      return { error };
    }

    throw { error };
  }
}
