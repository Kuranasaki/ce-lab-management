import { ToastEntity } from '@ce-lab-mgmt/shared-ui';
import {
  BaseResponse,
  GetCertificateResponse,
} from '@ce-lab-mgmt/api-interfaces';
import { Certificate } from '../../entity/get_certificate/certificateEntity';

export default async function mapper(
  rawData: BaseResponse<GetCertificateResponse>
): Promise<Certificate | ToastEntity> {
  if (rawData.error) {
    return ToastEntity.fromCode(rawData.error.code ?? 500);
  }
  if (!rawData.data) {
    return ToastEntity.unknownError();
  }
  return new Certificate(
    rawData.data.id,
    new Date(rawData.data.createdOn),
    rawData.data.fileName,
    rawData.data.fileSize,
    rawData.data.mimeType,
    rawData.data.url
  );
}
