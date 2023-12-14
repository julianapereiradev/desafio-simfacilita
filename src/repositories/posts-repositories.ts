import prisma from '../database';

async function findSessionByUserId(userId: number) {
  return prisma.session.findFirst({
    where: { userId },
  });
}

async function createPost({userId, description}) {
    return prisma.post.create({
        data: {userId, description},
    });
}

export const postsRepository = {
  findSessionByUserId,
  createPost,
};
