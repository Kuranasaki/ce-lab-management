import { BaseResponse } from '@ce-lab-mgmt/api-interfaces';
import { RawData } from '../models/rawData';
import { api } from '../axios/api';
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
      return new BaseResponse({ error: { code: error.response.data.status } });
    }
    return new BaseResponse({ error: { code: 500 } });
  }
}
