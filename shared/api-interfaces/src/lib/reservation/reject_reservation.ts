import { t } from 'elysia';

/*
Request: 
  - POST /reservations/reject/:reservationID
  - No request body

-> Change status to Canceled

Response:
  - success
    - statusCode: 200
    - body: RejectReservationResponseSchema
*/
export const RejectReservationResponseSchema = t.Object({
  id: t.String(),
  Status: t.Enum({
    Pending: 'pending',
    Processing: 'processing',
    Success: 'success',
    Canceled: 'canceled',
  }),
});
