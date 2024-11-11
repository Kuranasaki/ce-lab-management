import {
  BaseResponse,
  GetCertificateResponse,
} from '@ce-lab-mgmt/api-interfaces';
import { api } from '../../adapter/axios';
import { AxiosError } from 'axios';

export default async function getCertificate(
  id: string
): Promise<BaseResponse<GetCertificateResponse>> {
  try {
    // const response = await api.get<BaseResponse<GetCertificateResponse>>(
    //   `/certificate/${id}`
    // );
    // return response.data;

    return new BaseResponse({
      data: {
        createdOn: new Date(),
        id: '123',
        fileName: `cert-${id}.pdf`,
        fileSize: 1024 * 1024 * 1.24,
        mimeType: 'application/pdf',
        url: 'https://www.petrochem.sc.chula.ac.th/wp-content/uploads/2022/02/%E0%B8%88%E0%B8%9731-%E0%B8%84%E0%B8%B3%E0%B8%A3%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%82%E0%B8%AD%E0%B8%A5%E0%B8%B2%E0%B8%AD%E0%B8%AD%E0%B8%81.pdf',
      },
    });

    // return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return new BaseResponse({ error: { code: error.response.data.status } });
    }
    return new BaseResponse({ error: { code: 500 } });
  }
}
