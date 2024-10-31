import { t } from 'elysia';

// Upload certificate for experiment for staff if the experiment is done
/*
Request
- POST: /experiment/:id/upload_certificate
- Body: UploadCertificateRequestSchema

Response
- Status: 200
- Body: UploadCertificateResponseSchema
*/

export const UploadCertificateRequestSchema = t.Object({
  certificate: t.File(), // PDF file
});

export const UploadCertificateResponseSchema = t.Object({
  id: t.String(),
  reservationID: t.String(),
  testItemID: t.String(),
  assignedProfessorID: t.String(),
  testFormURL: t.String(),
  certificateURL: t.String(),
  isDone: t.Boolean(),
});
