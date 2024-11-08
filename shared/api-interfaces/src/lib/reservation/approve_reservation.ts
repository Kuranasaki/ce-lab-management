import { t } from 'elysia';

/*
Request: 
  - POST /reservations/approve/:reservationID
  - No request body

-> Change status to Processing
-> Generate experiment for each test in reservation (Copy from test form template)

Response:
  - success
    - statusCode: 200
    - body: GetReservationSchema
*/
export const ApproveReservationResponseSchema = t.Object({
  id: t.String(),
  Status: t.Enum({
    Pending: 'pending',
    Processing: 'processing',
    Success: 'success',
    Canceled: 'canceled',
  }),
});
