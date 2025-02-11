import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as typeof globalThis & { prisma?: PrismaClient };

// Reutilizar la instancia de Prisma en desarrollo
const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
