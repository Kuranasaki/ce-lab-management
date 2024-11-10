import {
  BaseResponse,
  RequestReservationForm,
  RequestReservationResponse,
} from '@ce-lab-mgmt/api-interfaces';
import { AxiosError } from 'axios';
import { sendToQueue } from '../../adapter/stomp';
import { reservationApi } from '../../adapter/axios';

// CHANGE TO REST API ON PRODUCTION
export default async function postRequestReservationRepository(
  data: RequestReservationForm
): Promise<BaseResponse<RequestReservationResponse>> {
  try {

    const response = await reservationApi.reservations.post(data);
    return response.data
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return new BaseResponse({ error: error.response.data.error });
    }
    return new BaseResponse({ error: { code: 500 } });
  }
}
