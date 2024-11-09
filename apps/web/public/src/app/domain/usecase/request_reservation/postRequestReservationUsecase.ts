import { ToastEntity } from '@ce-lab-mgmt/shared-ui';
import postRequestReservation from '../../../data/repositories/request_reservation/postRequestReservationRepository';
import reqReservRequestMapper from '../../mapper/request_reservation/reqReservRequestMapper';
import reqReservResponseMapper from '../../mapper/request_reservation/reqReservResponseMapper';
import {
  OrgInfoFormReturned,
  TestListFormReturned,
} from '../../entity/request_reservation/reqReservRequestFormEntity';

export default async function postRequestReservationUsecase({
  orgForm,
  testListForm,
}: {
  orgForm: OrgInfoFormReturned;
  testListForm: TestListFormReturned;
}): Promise<ToastEntity> {
  const request = reqReservRequestMapper({ orgForm, testListForm });
  const result = await postRequestReservation(request);

  const toastEntity = reqReservResponseMapper(result);
  return toastEntity;
}
