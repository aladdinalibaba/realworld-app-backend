import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function connectToDB() {
  try {
    await prisma.$connect();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Unable to connect to database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

connectToDB();

export default prisma;
