import { BaseResponse, Error, GetAllExperimantResponse, GetAllReservationResponse } from '@ce-lab-mgmt/api-interfaces';
import { api } from '../../adapter/axios';
import { AxiosError } from 'axios';

export default async function getAllExperiment(): Promise<
    BaseResponse<GetAllExperimantResponse>
> {
    try {
        const response = await api.get<BaseResponse<GetAllExperimantResponse>>('/experiments');
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            return new BaseResponse({ error: { code: error.response.data.status } });
        }
        return new BaseResponse({ error: { code: 500 } });
    }
}
