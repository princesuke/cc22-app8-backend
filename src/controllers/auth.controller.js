import {
  createUser,
  findUserByEmail,
  verifyUser,
  findUserById,
} from "../services/auth.services.js";

import { generateToken } from "../utils/jwt.js";

export async function register(req, res) {
  const { email, password } = req.body;

  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    return res.status(400).json({
      message: "อีเมลนี้ถูกใช้งานไปแล้ว",
    });
  }

  const user = await createUser(email, password);
  res.status(201).json({ id: user.id, email: user.email });
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await verifyUser(email, password);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const accessToken = generateToken({ id: user.id, role: user.role });

  res.json({ accessToken });
}

export async function me(req, res) {
  const user = await findUserById(req.userId);

  res.json({ id: user.id, email: user.email, role: user.role });
}
