import { emailAlreadyExistsError } from '../errors/errors';
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

async function findSessionByToken(token: string) {
  return prisma.session.findFirst({
    where: { token },
    select: { id: true, userId: true, token: true },
  });
}

async function findUserProfileById(id: number) {
  return prisma.user.findFirst({
    where: { id },
  });
}

async function updateUserProfile({ id, name, lastName, birthday, phone, email, password, profileUrl }) {
  const existingUser = await prisma.user.findFirst({
    where: {
      email: email,
      id: {
        not: id,
      },
    },
  });

  if (existingUser) {
    throw emailAlreadyExistsError("This email already exists!");
  }

  const hash = bcrypt.hashSync(password, 10);

  return prisma.user.update({
    where: { id },
    data: {
      name,
      lastName,
      birthday,
      phone,
      email,
      password: hash,
      profileUrl,
    },
  });
}

async function findAllUsers() {
  const result = await prisma.user.findMany({
    select: {
      name: true,
      lastName: true,
      profileUrl: true,
    },
  });

  return result;
}

async function deleteUserComments(userId: number) {
  await prisma.comment.deleteMany({
    where: { userId },
  });
}

async function deleteUserPosts(userId: number) {
  await prisma.post.deleteMany({
    where: { userId },
  });
}

async function deleteUserFollowers(userId: number) {
  await prisma.follow.deleteMany({
    where: { followedId: userId },
  });
}

async function deleteUserFollowing(userId: number) {
  await prisma.follow.deleteMany({
    where: { followerId: userId },
  });
}

async function deleteUserProfile(userId: number) {
  await prisma.user.delete({
    where: { id: userId },
  });
}


export const usersRepository = {
  createUserRegister,
  findUsers,
  createUserLogin,
  findSessionByToken,
  findUserProfileById,
  updateUserProfile,
  findAllUsers,
  deleteUserComments,
  deleteUserPosts,
  deleteUserFollowers,
  deleteUserFollowing,
  deleteUserProfile
};
