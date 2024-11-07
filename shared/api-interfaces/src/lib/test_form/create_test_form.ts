import { t } from 'elysia';

// For staff to upload a test form template
/* 
- POST: /test-form
- Request: CreateTestFormRequestSchema
- Response: CreateTestFormResponseSchema, status 201
*/
export const CreateTestFormRequestSchema = t.Object({
  name: t.String(),
  templateFile: t.File(),
  dataSheetName: t.String(),
  dataFirstRow: t.Number(),
  dataLastRow: t.Number(),
  dataColumn: t.Array(
    t.Object({
      label: t.String(),
      dataType: t.String(),
      dataFirstColumn: t.String(),
      dataLastColumn: t.String(),
    })
  ),
});

export const CreateTestFormResponseSchema = t.Object({
  id: t.String(),
  templateFileURL: t.String(),
});
