import { Static, t } from 'elysia';
import {
  OrganizationInfoSchema,
  ReservationSchema,
  ReservationStatusSchema,
  TestInfoSchema,
} from './reservation';

export const GetReservationResponseSchema = t.Object({
  reservationID: t.String(),
  orgInfo: OrganizationInfoSchema,
  testInfo: TestInfoSchema,
  status: ReservationStatusSchema,
  totalPrice: t.Number(),
  createdOn: t.String({ format: 'date-time' }),
});

export type GetReservationResponse = Static<
  typeof GetReservationResponseSchema
>;

const GetReservationSchema = ReservationSchema;
export { GetReservationSchema };
