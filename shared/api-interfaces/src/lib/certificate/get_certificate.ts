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

export enum GetCertificateResponseMessage {
  NotFound = 'Certificate not found',
  InternalServerError = 'Internal server error',
}

export const GetCertificateErrorResponse = t.Object({
  message: t.Enum(GetCertificateResponseMessage),
});
/*
Response
- Status: 404 or 500
- Body: GetCertificateErrorResponse
*/
