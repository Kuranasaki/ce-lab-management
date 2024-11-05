import { t } from 'elysia';

// Get one staff
/*
Request
- GET: /users/staff/:id
- No request body

Response
- Status: 200
- Body: GetOneStaffResponseSchema
*/

export const GetOneStaffResponseSchema = t.Object({
  id: t.String(),
  name: t.String(),
  email: t.String(),
});
