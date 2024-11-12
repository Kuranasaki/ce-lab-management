import { BaseResponse } from '@ce-lab-mgmt/api-interfaces';
import { RawData } from '../models/rawData';
import { api } from '../adapter/axios';
import { AxiosError } from 'axios';

export default async function getAllRawData(): Promise<
  BaseResponse<RawData[]>
> {
  try {
    const response = await api.get<BaseResponse<RawData[]>>('/raw-data');
    /* 
      the entire response will be an AxiosResponse like this:
      {
        data : {
          // The actual data type is Response<RawData[]> 
        }
        status: 200;
        statusText: 'OK';
        headers: { ... },
        config: { ... }
      }

    */

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return { error: error.response.data.error, success: false };
    }
    return {
      error: { code: 500, message: 'Internal Server Error' },
      success: false,
    };
  }
}
