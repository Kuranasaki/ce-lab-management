import { t } from 'elysia';

/*
Request
- GET /certificate/{testId}
- Path Parameter: testId: string
*/
export const GetCertificateResponseSchema = t.Object({
  id: t.String(),
  url: t.String({
    pattern: '^https?://.+$',
  }),
  fileName: t.String(),
  fileSize: t.Number(),
  mimeType: t.String(),
  createdOn: t.Date(),
});

export interface GetCertificateResponse {
  id: string;
  url: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  createdOn: Date;
}

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
