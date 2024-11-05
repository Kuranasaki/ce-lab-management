import { t } from 'elysia';

// For staff to re-upload or update label a test form template
/* 
- PUT: /test-form/:id
- Request: UpdateTestFormRequestSchema
- Response: UpdateTestFormResponseSchema, status 200
*/
export const UpdateTestFormRequestSchema = t.Object({
  name: t.Optional(t.String()),
  templateFile: t.Optional(t.File()),
  dataSheetName: t.Optional(t.String()),
  dataFirstRow: t.Optional(t.Number()),
  dataLastRow: t.Optional(t.Number()),
  dataColumn: t.Optional(
    t.Array(
      t.Object({
        label: t.String(),
        dataType: t.String(),
        dataFirstColumn: t.Number(),
        dataLastColumn: t.Number(),
      })
    )
  ),
});

export const UpdateTestFormResponseSchema = t.Object({
  name: t.String(),
  templateFileURL: t.String(),
  dataSheetName: t.String(),
  dataFirstRow: t.Number(),
  dataLastRow: t.Number(),
  dataColumn: t.Array(
    t.Object({
      label: t.String(),
      dataType: t.String(),
      dataFirstColumn: t.Number(),
      dataLastColumn: t.Number(),
    })
  ),
});
