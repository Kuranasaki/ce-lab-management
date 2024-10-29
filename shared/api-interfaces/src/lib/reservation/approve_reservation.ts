import { GetReservationSchema } from './get_reservation';

/*
Request: 
  - POST /reservation/approve/:reservationID
  - No request body

-> Change status to Processing

Response:
  - success
    - statusCode: 200
    - body: GetReservationSchema
*/
export const approveReservationResponseSchema = GetReservationSchema;
