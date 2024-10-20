import { ToastEntity } from '@ce-lab-mgmt/shared-ui';
import { RequestReservationResponse } from '../../../data/models/request_reservation/response';

export default function reqReservResponseMapper(
  data: RequestReservationResponse
): ToastEntity {
  return ToastEntity.fromCode(data['code']);
}
