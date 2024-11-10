import { PrismaClient } from '@prisma/client';

export class PrismaService {
  private static instance: PrismaClient;

  static getInstance(): PrismaClient {
    if (!PrismaService.instance) {
      PrismaService.instance = new PrismaClient({
        log: ['error', 'warn'],
      });
    }
    return PrismaService.instance;
  }
}