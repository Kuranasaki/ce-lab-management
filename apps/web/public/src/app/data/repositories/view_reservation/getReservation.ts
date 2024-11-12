import { BaseResponse, Reservation } from '@ce-lab-mgmt/api-interfaces';
import { api, reservationApi } from '../../adapter/axios';
import { AxiosError } from 'axios';

export default async function getReservation(
  id: string
): Promise<BaseResponse<Reservation>> {
  try {
    const response = await reservationApi.api.v1.reservations({ id }).get({
      query: {
        limit: 1,
        page: 1,
      },
    });
    return response.data;
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
