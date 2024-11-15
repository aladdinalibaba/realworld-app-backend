import bcrypt from 'bcrypt';
import prisma from '../prisma.js';
import HttpException from '../util/exception.js';

async function findAll() {
  const data = await prisma.user.findMany();
  return data;
}

async function findOne(options) {
  const data = await prisma.user.findUnique(options);
  return data;
}

async function create({ email, password, ...rest }) {
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
      ...rest,
      email: lowerEmail,
      password: hashed,
    },
  });

  return data;
}

export default { create, findAll, findOne };
