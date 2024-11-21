import bcrypt from 'bcrypt';
import prisma from '../prisma.js';
import HttpException from '../util/exception.js';

function findAll(options) {
  return prisma.user.findMany(options);
}

async function findOne(options) {
  return prisma.user.findUnique(options);
}

async function create({ email, password, username }) {
  const lowerEmail = email.toLowerCase();

  const existingUser = await prisma.user.findUnique({
    where: { email: lowerEmail },
  });

  if (existingUser) {
    throw new HttpException('Already have email', 400);
  }

  const hashed = await bcrypt.hash(password, 6);

  const data = await prisma.user.create({
    data: {
      username,
      displayName: username,
      email: lowerEmail,
      password: hashed,
    },
  });

  return data;
}

async function follow(followerId, followingId) {
  if (followerId === followingId) {
    throw new HttpException('Can not follow your self', 400);
  }

  const user2 = await prisma.user.findFirst({
    where: {
      id: followingId,
    },
    include: {
      following: true,
    },
  });

  if (!user2) {
    throw new HttpException('User not found', 404);
  }

  const isFollowed = user2.following.find((v) => v.followerId === followerId);

  if (isFollowed) {
    throw new HttpException(`You already follow userId ${followingId}`, 400);
  }

  return prisma.follow.create({
    data: {
      followerId,
      followingId,
    },
    include: {
      follower: true,
      following: true,
    },
  });
}

async function unFollow(followerId, followingId) {
  if (followerId === followingId) {
    throw new HttpException('Can not follow your self', 400);
  }

  const user2 = await prisma.user.findFirst({
    where: {
      id: followingId,
    },
    include: {
      following: true,
    },
  });

  if (!user2) {
    throw new HttpException('User not found', 404);
  }

  const isFollowed = user2.following.find((v) => v.followerId === followerId);

  if (!isFollowed) {
    throw new HttpException(`You are not following userId ${followingId}`, 400);
  }

  return prisma.follow.delete({
    where: {
      followerId_followingId: {
        followerId,
        followingId,
      },
    },
  });
}

export default { create, findAll, findOne, follow, unFollow };
