import { PrismaClient } from '../../prisma/client/wage';

export const prisma = new PrismaClient();

export const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log('Connected to PostgreSQL with Prisma');
    } catch (err) {
        console.error('Database connection error:', err);
    }
};
