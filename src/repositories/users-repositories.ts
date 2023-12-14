import prisma from '../database';
import { InputUsers } from '../protocols';
import bcrypt from "bcrypt"
import { v4 as uuid } from "uuid"

async function createUserRegister({ name, lastName, birthday, phone, email, password, profileUrl }: InputUsers) {
  const hash = bcrypt.hashSync(password, 10)

  return prisma.user.create({
    data: { name, lastName, birthday, phone, email, password: hash, profileUrl },
  });
}

async function findUsers(email: string) {
  return prisma.user.findFirst({
    where: { email: email },
  });
}

async function createUserLogin(userId: number) {
  const tokenUuid = uuid()

  return prisma.session.create({
    data: { userId, token: tokenUuid },
  });
}



export const usersRepository = {
  createUserRegister,
  findUsers,
  createUserLogin
};