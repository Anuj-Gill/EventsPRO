import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../util/Jwt";

export async function jwtCheck(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res
      .status(401)
      .json({ error: "Authorization header is missing or invalid!" });
    return;
  }

  const token = authHeader.split(" ")[1];

  const { payload, error } = await verifyJwt(token);
  if (error) {
    res.status(401).json({ message: "Invalid credentials!" });
    return;
  }

  if (!payload) {
    res.status(403).json({ error: "Token payload is missing!" });
    return;
  }
  req.body.jwtPayload = payload;
  next();
}
