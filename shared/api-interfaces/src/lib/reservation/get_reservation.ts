import { t } from 'elysia';
import { OrganizationInfoSchema, TestInfoSchema } from './request_reservation';

/*
Request
- GET /reservation?id={reservationID}
- Path: reservationID: string
- Header: authorization: Barear token
*/

const GetReservationSchema = t.Object({
  reservationID: t.String(),
  orgInfo: OrganizationInfoSchema,
  testInfo: TestInfoSchema,
  Status: t.Enum({
    Pending: 'pending',
    Processing: 'processing',
    Success: 'success',
    Canceled: 'canceled',
  }),
  totalPrice: t.Number(),
  CreatedOn: t.Date(),
});

/*
Response
- Success -> Status: 200, Body: GetReservationSchema
- No Reservation Found -> Status: 404
- Invalid ID -> Status: 400
- Unauthorized -> Status: 401
 */

export { GetReservationSchema };
