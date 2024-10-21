import {
  BaseResponse,
  RequestReservationForm,
  RequestReservationResponse,
} from '@ce-lab-mgmt/api-interfaces';
import { AxiosError } from 'axios';
import { sendToQueue } from '../../adapter/stomp';

// CHANGE TO REST API ON PRODUCTION
export default async function postRequestReservationRepository(
  data: RequestReservationForm
): Promise<BaseResponse<RequestReservationResponse>> {
  try {
    const rabbitResult = await sendToQueue('reservation', data);

    if (rabbitResult.code !== 200) {
      return new BaseResponse({
        error: { code: rabbitResult.code },
      });
    }

    return new BaseResponse({ data: { code: 200 } });
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return new BaseResponse({ error: error.response.data.error });
    }
    return new BaseResponse({ error: { code: 500 } });
  }
}
