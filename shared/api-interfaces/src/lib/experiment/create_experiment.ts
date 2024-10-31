import { t } from 'elysia';

// Create Experiment for each testItem in reservation that approved by staff
// Note: This API is called when staff approve the reservation, not directly by user

export const CreateExperimentRequestSchema = t.Object({
  reservationID: t.String(),
  // Note: This is not testID, Please add testItemID to each testItem Reservation because in one reservation, there can be multiple same testID
  testItemID: t.String(),
});

export const CreateExperimentResponseSchema = t.Object({
  id: t.String(),
  reservationID: t.String(),
  testItemID: t.String(),
  assignedProfessorID: t.Nullable(t.String()),
  testFormURL: t.String(), // Copy from test-form template
  certificateURL: t.Nullable(t.String()),
});
