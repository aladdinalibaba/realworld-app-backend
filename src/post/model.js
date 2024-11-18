import prisma from '../prisma.js';
import HttpException from '../util/exception.js';

async function create(data, authorId) {
  return prisma.post.create({
    data: {
      ...data,
      authorId,
      tags: {
        connectOrCreate: data.tags.map((tag) => ({
          where: { name: tag },
          create: { name: tag },
        })),
      },
    },
    include: {
      tags: true,
    },
  });
}

async function findAll(options) {
  return prisma.post.findMany(options);
}

async function addTags(authorId, postId, data) {
  const post = await prisma.post.findUnique({
    where: { id: parseInt(postId, 10) },
  });

  if (!post) {
    throw new HttpException('Post not found', 400);
  }

  if (post.authorId !== authorId) {
    throw new HttpException(
      'You are not authorized to add tags to this post',
      403,
    );
  }

  return prisma.post.update({
    where: { id: postId },
    data: {
      tags: {
        connectOrCreate: data.tags.map((tag) => ({
          where: { name: tag },
          create: { name: tag },
        })),
      },
    },
    include: { tags: true },
  });
}

export default { create, findAll, addTags };
