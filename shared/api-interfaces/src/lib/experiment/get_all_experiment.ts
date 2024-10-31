import { t } from 'elysia';

// Get all experiment for professor
/* 
Request
- Get: /experiment
- No request body

Response
- Status: 200
- Body: GetAllExperimentResponseSchema
*/

export const GetAllExperimentResponseSchema = t.Array(
  t.Object({
    id: t.String(),
    reservationID: t.String(),
    testItemID: t.String(),
    isDone: t.Boolean(),
  })
);
