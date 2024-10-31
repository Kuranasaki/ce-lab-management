import { t } from 'elysia';

/* 
Request
- Get one test form by ID
- GET: /test-form/:id
- No request body

Response
- GetOneTestFormResponseSchema
- status 200
 */
export const GetOneTestFormResponseSchema = t.Object({
  id: t.String(),
  name: t.String(),
  oneDriveURL: t.String(),
  dataAreaLabelTopLeft: t.String(),
  dataAreaLabelBottomRight: t.String(),
});
