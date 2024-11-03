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
  id: t.String(), // Experiment ID
  reservationID: t.String(), // Reservation ID
  testItemID: t.String(), // Pointer to testItem in reservation
  testName: t.String(), // Test Name e.g. Tensile test of prestressed wire and presstressed strand: wire ø 7 mm
  testDetails: t.Nullable(t.String()), // Test Details Added by customer
  testNote: t.Nullable(t.String()), // Test Note Added by customer
  assignedProfessorID: t.Nullable(t.String()),
  assignedProfessorName: t.Nullable(t.String()),
  markedAsDone: t.Boolean(),
  certificateUploadedAt: t.Nullable(t.Date()),
});
