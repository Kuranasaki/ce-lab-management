import getCertificate from '../../../data/repositories/get_certificate/getCertificate';
import mapper from '../../mapper/get_certificate/certificateMapper';

export default async function getCertificateUsecase(id: string) {
  const rawData = await getCertificate(id);
  if (rawData.error) {
    return null;
  }
  const mappedData = await mapper(rawData);
  return mappedData;
}
