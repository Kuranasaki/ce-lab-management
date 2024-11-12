import {
  BaseResponse,
  RequestReservationForm,
  RequestReservationResponse,
} from '@ce-lab-mgmt/api-interfaces';
import { AxiosError } from 'axios';
import { reservationApi } from '../../adapter/axios';
import { AuthClass } from '../../../hooks/tokenClass';

// CHANGE TO REST API ON PRODUCTION
export default async function postRequestReservationRepository(
  data: RequestReservationForm
): Promise<BaseResponse<RequestReservationResponse>> {
  try {
    const token = AuthClass.getToken();
    const userId = AuthClass.getUserId();
    console.log(data);
    // const response = await sendToQueue('reservation_requests', data);
    const response = await reservationApi.api.v1.reservations.index.post(
      {
        orgInfo: data.orgInfo,
        testInfo: data.testInfo,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.code !== 200) {
      return {
        error: {
          code: response.data.code,
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
      error: { code: 500, message: 'Internal Server Error' },
      success: false,
    };
  }
}
