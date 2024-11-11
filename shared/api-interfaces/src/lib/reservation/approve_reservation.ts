import { t } from 'elysia';
import { ReservationStatusSchema } from './reservation';

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
  Status: ReservationStatusSchema,
});
