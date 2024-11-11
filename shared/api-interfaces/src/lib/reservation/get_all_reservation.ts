import { t } from 'elysia';
import { Reservation, ReservationSchema, ReservationStatusSchema } from './reservation';
import { PaginationParamsSchema } from '@ce-lab-mgmt/core-utils';

type GetAllReservationResponse = Reservation[];

export { GetAllReservationResponse };

export const ReservationQuerySchema = t.Composite([
  t.Object({
    status: t.Optional(ReservationStatusSchema),
    fromDate: t.Optional(t.String({ format: 'date-time' })),
    toDate: t.Optional(t.String({ format: 'date-time' })),
  }),
  PaginationParamsSchema,
]);

const GetAllReservationSchema = t.Array(ReservationSchema);

export { GetAllReservationSchema };
