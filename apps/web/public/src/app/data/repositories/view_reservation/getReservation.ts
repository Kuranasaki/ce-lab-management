import { BaseResponse, GetAllReservationResponse, GetReservationResponse } from '@ce-lab-mgmt/api-interfaces';
import { api } from '../../adapter/axios';
import { AxiosError } from 'axios';

export default async function getReservation(id: string): Promise<
    BaseResponse<GetReservationResponse>
> {
    try {
        const response = await api.get<BaseResponse<GetReservationResponse>>(`/reservations/${id}`);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            return new BaseResponse({ error: { code: error.response.data.status } });
        }
        return new BaseResponse({ error: { code: 500 } });
    }
}
