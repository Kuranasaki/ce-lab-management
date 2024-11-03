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
  dataAreaLabelTopLeft: t.Optional(t.String()), // Excel cell e.g. A12
  dataAreaLabelBottomRight: t.Optional(t.String()),
});

export const UpdateTestFormResponseSchema = t.Object({
  id: t.String(),
  name: t.String(),
  templateFileURL: t.String(),
  dataAreaLabelTopLeft: t.String(),
  dataAreaLabelBottomRight: t.String(),
});
