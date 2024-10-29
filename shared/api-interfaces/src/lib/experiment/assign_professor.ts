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
- Status: 200
- Body: AssignProfessorResponseSchema
 */
export const AssignProfessorResponseSchema = t.Object({
  assignedProfessorID: t.String(),
  // Other fields to be added (Experiment info)
});
