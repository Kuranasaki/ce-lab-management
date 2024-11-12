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
    console.log(data);
    const rabbitResult = await sendToQueue('reservation_requests', data);

    if (rabbitResult.code !== 200) {
      return {
        error: {
          code: rabbitResult.code.toString(),
          message: 'Failed to send to queue',
        },
        success: false,
      };
    }

    return { data: { code: 200 }, success: true };
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return {
        error: {
          code: error.response.data.status,
          message: error.response.data.message,
        },
        success: false,
      };
    }
    return {
      error: { code: '500', message: 'Internal Server Error' },
      success: false,
    };
  }
}
