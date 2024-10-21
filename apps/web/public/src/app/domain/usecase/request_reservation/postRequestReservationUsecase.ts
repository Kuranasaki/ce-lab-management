import { ToastEntity } from '@ce-lab-mgmt/shared-ui';
import postRequestReservation from '../../../data/repositories/request_reservation/postRequestReservationRepository';
import reqReservRequestMapper from '../../mapper/request_reservation/reqReservRequestMapper';
import reqReservResponseMapper from '../../mapper/request_reservation/reqReservResponseMapper';
import { TestListFormReturned } from '../../entity/request_reservation/reqReservRequestFormEntity';

export default async function postRequestReservationUsecase(
  data: TestListFormReturned
): Promise<ToastEntity> {
  const request = reqReservRequestMapper(data);
  const result = await postRequestReservation(request);

  const toastEntity = reqReservResponseMapper(result);
  return toastEntity;
}
