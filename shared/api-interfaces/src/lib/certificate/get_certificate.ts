import { t } from 'elysia';

/*
Request
- GET /certificate/{testId}
- Path Parameter: testId: string
*/
export const GetCertificateResponseSchema = t.File({
  contentType: 'application/pdf',
  fileName: t.String().default('certificate_{testId}.pdf'),
});
/*
Response
- Status: 200
- Body: GetCertificateResponseSchema
 */

export const GetCertificateNotFoundResponse = t.Object({
  message: t.String().default('Certificate not found'),
});
/*
Response
- Status: 404
- Body: GetCertificateNotFoundResponse
 */

export const GetCertificateInternalServerErrorResponse = t.Object({
  message: t.String().default('Internal server error'),
});
/*
Response
- Status: 500
- Body: GetCertificateInternalServerErrorResponse
*/
