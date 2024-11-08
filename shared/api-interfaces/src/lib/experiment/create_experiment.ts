import { t } from 'elysia';

// Create Experiment for each testItem in reservation that approved by staff
// Note: This API is called when staff approve the reservation, not directly by user

export const CreateExperimentRequestSchema = t.Object({
  reservationID: t.String(),
  // Note: This is not testID, Please add testItemID to each testItem Reservation because in one reservation, there can be multiple same testID
  // Maybe just index 0 -> n-1 for each testItem, or mongo id
  testItemID: t.String(),
});

// You may change the response schema, it's not used in the frontend
export const CreateExperimentResponseSchema = t.Object({
  id: t.String(),
  testFormURL: t.String(), // Copy from test-form template
});
