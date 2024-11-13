import {
  BaseResponse,
  RequestReservationResponse,
} from '@ce-lab-mgmt/api-interfaces';
import { ToastEntity } from '@ce-lab-mgmt/shared-ui';

export default function reqReservResponseMapper(
  data: BaseResponse<RequestReservationResponse>
): ToastEntity {
  return ToastEntity.fromCode(data.data?.code ?? data.error?.code ?? 500);
}
