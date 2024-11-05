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
    id: t.String(), // Experiment ID
    reservationID: t.String(), // Reservation ID
    testItemID: t.String(), // Pointer to testItem in reservation
    testName: t.String(), // Test Name e.g. Tensile test of prestressed wire and presstressed strand: wire ø 7 mm
    testAmount: t.Number(), // Test Amount
    testDetails: t.Nullable(t.String()), // Test Details Added by customer
    testNote: t.Nullable(t.String()), // Test Note Added by customer
    assignedProfessorID: t.Nullable(t.String()),
    assignedProfessorName: t.Nullable(t.String()),
    assignedAt: t.Date(),
    markedAsDone: t.Boolean(),
    markedAsDoneAt: t.Nullable(t.Date()),
    certificateUploadedAt: t.Nullable(t.Date()),
  })
);
