import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function findAll() {
  return prisma.user.findMany();
}

export default { findAll };