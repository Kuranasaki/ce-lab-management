import { t } from 'elysia';

// Get all experiment for professor
/* 
Request
- Get: /experiment
- No request body
- QueryParams: GetAllExperimentRequestParamsSchema

Response
- Status: 200
- Body: GetAllExperimentResponseSchema
*/

export const GetAllExperimentRequestParamsSchema = t.Object({
  reservationID: t.Optional(t.String()),
});

export const GetAllExperimentResponseSchema = t.Array(
  t.Object({
    id: t.String(),
    reservationID: t.String(),
    assignedProfessorID: t.String(),
    assignedProfessorName: t.String(),
    testItemID: t.String(),
    isDone: t.Boolean(),
  })
);
