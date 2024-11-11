import { PrismaClient } from '@prisma/client';
import { PrismaService } from './prisma.service';

export class PrismaUnitOfWork {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = PrismaService.getInstance();
  }

  async $transaction<T>(fn: () => Promise<T>): Promise<T> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    return this.prisma.$transaction(async (prisma: any) => {
      return fn();
    });
  }
}