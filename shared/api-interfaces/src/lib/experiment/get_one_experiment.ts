import { t } from 'elysia';

// Get one experiment by id
/*
Request
- GET: /experiment/:id
- No request body

Response
- Status: 200
- Body: GetOneExperimentResponseSchema
*/

export const GetOneExperimentResponseSchema = t.Object({
  id: t.String(),
  reservationID: t.String(),
  testItemID: t.String(),
  assignedProfessorID: t.String(),
  testFormURL: t.String(),
  certificateURL: t.Nullable(t.String()),
  isDone: t.Boolean(),
});
