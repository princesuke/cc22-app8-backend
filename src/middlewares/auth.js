import { verifyToken } from "../utils/jwt.js";
import createError from "http-errors";

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw createError(401, "Invalid credentials");

    // return res.status(401).json({
    //   message: "Invalid credentials",
    // });
  }

  const token = authHeader.split(" ")[1];
  //   console.log(token);

  try {
    const payload = verifyToken(token);
    req.userId = payload.id;
    next();
  } catch {
    throw createError(403)
    // res.status(403);
  }
}
