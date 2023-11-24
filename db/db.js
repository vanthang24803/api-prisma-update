// prisma.mjs

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function testConnection() {
  try {
    await prisma.$connect();
    console.log('Connected to the database');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    await prisma.$disconnect();
  }
}
