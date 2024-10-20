import { ToastEntity } from '@ce-lab-mgmt/shared-ui';
import { RequestReservationEntity } from '../../entity/request_reservation/reqReservRequestEntity';
import postRequestReservation from '../../../data/repositories/request_reservation/postRequestReservationRepository';
import reqReservRequestMapper from '../../mapper/request_reservation/reqReservRequestMapper';
import reqReservResponseMapper from '../../mapper/request_reservation/reqReservResponseMapper';

export default async function postRequestReservationUsecase(
  data: RequestReservationEntity
): Promise<ToastEntity> {
  const request = reqReservRequestMapper(data);
  const result = await postRequestReservation(request);

  const toastEntity = reqReservResponseMapper(result);
  return toastEntity;
}
