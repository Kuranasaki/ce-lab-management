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
  dataAreaLabelTopLeft: t.String(), // Excel cell e.g. A12
  dataAreaLabelBottomRight: t.String(),
});

export const CreateTestFormResponseSchema = t.Object({
  id: t.String(),
  name: t.String(),
  oneDriveURL: t.String(),
  dataAreaLabelTopLeft: t.String(),
  dataAreaLabelBottomRight: t.String(),
});
