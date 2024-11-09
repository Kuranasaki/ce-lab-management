import { t } from 'elysia';

// Get all professor
/*
Request
- GET: /users/professor
- No request body

Response
- Status: 200
- Body: GetAllProfessorResponseSchema
*/

export const GetAllProfessorResponseSchema = t.Array(
  t.Object({
    id: t.String(),
    name: t.String(),
  })
);
