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

export default { create, findAll, findOne };
