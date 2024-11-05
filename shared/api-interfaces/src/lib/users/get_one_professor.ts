import { t } from 'elysia';

// Get one professor
/*
Request
- GET: /users/professor/:id
- No request body

Response
- Status: 200
- Body: GetOneProfessorResponseSchema
*/
export const GetOneProfessorResponseSchema = t.Object({
  id: t.String(),
  name: t.String(),
  email: t.String(),
  // More fields maybe added here later
});
