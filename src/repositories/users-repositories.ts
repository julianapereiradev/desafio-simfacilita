import { emailAlreadyExistsError } from '../errors/errors';
import prisma from '../database';
import { InputUsers } from '../protocols';
import { v4 as uuid } from "uuid"

async function createUserRegister({ name, lastName, birthday, phone, email, password, profileUrl }: InputUsers) {
  return prisma.user.create({
    data: { name, lastName, birthday, phone, email, password, profileUrl },
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

  return prisma.user.update({
    where: { id },
    data: {
      name,
      lastName,
      birthday,
      phone,
      email,
      password,
      profileUrl,
    },
  });
}

async function findAllUsers() {
  const result = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      lastName: true,
      profileUrl: true,
    },
  });

  return result;
}

async function deleteUserProfile(userId: number) {
  try {
    const userPosts = await prisma.post.findMany({
      where: { userId },
      select: { id: true },
    });

    const userSessions = await prisma.session.findMany({
      where: { userId },
      select: { id: true },
    });

    const postIds = userPosts.map((post) => post.id);
    const sessionIds = userSessions.map((session) => session.id);

    await prisma.$transaction([
      prisma.comment.deleteMany({ where: { postId: { in: postIds } } }),
      prisma.post.deleteMany({ where: { userId } }),
      prisma.follow.deleteMany({ where: { OR: [{ followerId: userId }, { followedId: userId }] } }),
      prisma.session.deleteMany({ where: { id: { in: sessionIds } } }),
      prisma.user.delete({ where: { id: userId } }),
    ]);
  } catch (error) {
    console.error("Error deleting user profile:", error);
    throw error; // Re-throw the error to be caught by the calling function
  }
}


export const usersRepository = {
  createUserRegister,
  findUsers,
  createUserLogin,
  findSessionByToken,
  findUserProfileById,
  updateUserProfile,
  findAllUsers,
  deleteUserProfile
};
