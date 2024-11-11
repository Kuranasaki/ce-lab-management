import { PaginationParamsSchema } from '@ce-lab-mgmt/core-utils';
import { t as Type } from 'elysia';
export const ReservationStatusSchema = Type.Union([
  Type.Literal('pending'),
  Type.Literal('approved'),
  Type.Literal('rejected'),
  Type.Literal('cancelled'),
]);

export const CreateReservationSchema = Type.Object({
  testCategoryId: Type.String({ format: 'uuid' }),
  // requestedDate: Type.String({ format: 'date-time' }),
  notes: Type.Optional(Type.String()),
});

export const UpdateReservationSchema = Type.Object({
  notes: Type.String(),
});

export const ReservationQuerySchema = Type.Composite([
  Type.Object({
    status: Type.Optional(ReservationStatusSchema),
    fromDate: Type.Optional(Type.String({ format: 'date-time' })),
    toDate: Type.Optional(Type.String({ format: 'date-time' })),
  }),
  PaginationParamsSchema,
]);

export type ReservationStatus = typeof ReservationStatusSchema.static
export type CreateReservationDTO = typeof CreateReservationSchema.static
export type UpdateReservationDTO = typeof UpdateReservationSchema.static

