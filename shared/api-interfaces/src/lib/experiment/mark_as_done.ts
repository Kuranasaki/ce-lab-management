import { t } from 'elysia';

// Mark experiment as done by professor, this will make test form not editable anymore
// And Staff will be able to upload certificate

/*
Request
- POST: /experiment/:id/mark_as_done
- No request body

Response
- Status: 200
- Body: MarkAsDoneResponseSchema
 */

export const MarkAsDoneResponseSchema = t.Object({
  id: t.String(),
  reservationID: t.String(),
  testItemID: t.String(),
  testFormURL: t.String(), // Should never be null at this point
  markedAsDone: t.Boolean(),
});