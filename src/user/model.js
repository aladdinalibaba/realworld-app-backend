import prisma from '../prisma.js';

async function findAll() {
  return prisma.user.findMany();
}

export default { findAll };
