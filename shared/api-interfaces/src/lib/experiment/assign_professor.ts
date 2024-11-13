import { t } from 'elysia';

/*
Request
- POST /experiment/assign_professor
- Body: AssignProfessorRequestSchema
*/
export const AssignProfessorRequestSchema = t.Object({
  professorID: t.String(),
  experimentID: t.String(),
});

/*
Response
- Success -> Status: 200, Body: AssignProfessorResponseSchema
- No Professor Found -> Status: 404
 */
export const AssignProfessorResponseSchema = t.Object({
  assignedProfessorID: t.String(),
  assignedProfessorName: t.String(),
  experimentID: t.String(),
});
