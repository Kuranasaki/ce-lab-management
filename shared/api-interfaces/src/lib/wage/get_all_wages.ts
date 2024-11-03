import { t } from 'elysia';

// Get all wages
/*
Request
- GET: /wages
- No request body
- QueryParams: GetAllWagesRequestParamsSchema

Response
- Status: 200
- Body: GetAllWagesResponseSchema
*/

export const GetAllWagesRequestParamsSchema = t.Object({
  professorID: t.Optional(t.String()),
  startDate: t.Optional(t.Date()),
  endDate: t.Optional(t.Date()),
});

export const GetAllWagesResponseSchema = t.Array(
  t.Object({
    professorID: t.String(),
    experimentID: t.String(),
    wage: t.Number(),
    certificateUploadedAt: t.Date(),
  })
);
