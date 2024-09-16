import { z } from 'zod';
import { publicProcedure, router } from '../trpc/instances';
import { prisma } from '../config/database';
import { TRPCError } from '@trpc/server';

export const statementMethod = {
  addStatement: publicProcedure
    .input(
      z.object({
        profID: z.string(),
        taskID: z.string().uuid(),
        wage: z.number().positive(), // Ensure wage is greater than zero
      })
    )
    .mutation(async ({ input }) => {
      try {
        // Check if the taskID already has a statement
        const existingStatement = await prisma.statement.findUnique({
          where: { taskID: input.taskID },
        });
        if (existingStatement) {
          throw new TRPCError({
            code: 'UNPROCESSABLE_CONTENT',
            message: 'This taskID already has a statement',
          });
        }

        // Add the new statement
        const statement = await prisma.statement.create({
          data: {
            taskID: input.taskID,
            profID: input.profID,
            wage: input.wage,
          },
        });

        return statement;
      } catch (error) {
        console.log(error)
        if (error instanceof TRPCError) {
          throw error; // Re-throw known TRPC errors
        } else if (error instanceof Error && error.message.includes('wage must greater than zero')) {
          throw new TRPCError({
            code: 'UNPROCESSABLE_CONTENT',
            message: 'Wage must be greater than zero',
          });
        } else {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Internal Server Error',
          });
        }
      }
    }),

  getAllStatements: publicProcedure
    .input(
      z.object({
        profID: z.string().optional(),
        startDate: z.string().optional(), 
        endDate: z.string().optional(),   
      }).partial()
    )
    .query(async ({ input }) => {
      try {
        const { profID, startDate, endDate } = input;

        // Validate date range
        if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
          throw new TRPCError({
            code: 'UNPROCESSABLE_CONTENT',
            message: 'startDate must not be greater than endDate',
          });
        }

        // Build the query
        const whereConditions: any = {};

        if (profID) {
          whereConditions.profID = profID;
        }

        if (startDate || endDate) {
          whereConditions.createdAt = {};
          if (startDate) {
            whereConditions.createdAt.gte = new Date(startDate + 'T00:00:00Z');
          }
          if (endDate) {
            whereConditions.createdAt.lte = new Date(endDate + 'T23:59:59Z');
          }
        }

        // Fetch data from the database
        const statements = await prisma.statement.findMany({
          where: whereConditions,
        });

        return statements;
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error; // Re-throw known TRPC errors
        } else {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Internal Server Error',
          });
        }
      }
    }),

  getStatement: publicProcedure
    .input(z.object({ taskID: z.string().uuid() }))
    .query(async ({ input }) => {
      try {
        const statement = await prisma.statement.findUnique({
          where: { taskID: input.taskID },
        });
        if (!statement) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Statement of this taskID not found',
          });
        }
        return statement;
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error; // rethrow known TRPC errors
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Internal Server Error',
        });
      }
    }),
};
