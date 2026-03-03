import prisma from "../libs/prisma.js";
import bcrypt from "bcrypt";

export async function createUser(email, password) {
  const hash = await bcrypt.hash(password, 10);
  const result = prisma.user.create({
    data: {
      email,
      password: hash,
    },
  });

  return result;
}

export async function findUserByEmail(email) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
}

export async function verifyUser(email, password) {
  const user = await findUserByEmail(email);
  if (!user) return null;
  const isMatch = await bcrypt.compare(password, user.password);
  return isMatch ? user : null;
}

export async function findUserById(id) {
    const user = await prisma.user.findUnique({
        where: {
            id
        }
    })
    return user
}
