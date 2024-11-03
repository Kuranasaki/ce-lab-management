import { t } from 'elysia';

/*
Request
- GET /reservation
- Header: authorization: Barear token
*/

const ReservationSchema = t.Object({
  reservationID: t.String(),
  Status: t.Enum({
    Pending: 'pending',
    Processing: 'processing',
    Success: 'success',
    Canceled: 'canceled',
  }),
  testType: t.String(),
  CreatedOn: t.Date(),
  totalPrice: t.Number(),
});

/*
Response
- Success -> Status: 200, Body: ReservationSchema[]
- No User Found -> Status: 404
 */

const GetAllReservationSchema = t.Array(ReservationSchema);

export { GetAllReservationSchema };
