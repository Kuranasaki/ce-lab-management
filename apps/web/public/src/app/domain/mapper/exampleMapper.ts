// Mapper for raw data to data to be rendered on UI, which is totalPrice or error data for toast.
import { BaseResponse } from '@ce-lab-mgmt/api-interfaces';
import { RawData } from '../../data/models/rawData';
import ToBeRenderedData from '../entity/toBeRenderedData';
import { ToastEntity } from '@ce-lab-mgmt/shared-ui';

export default async function mapper(
  rawData: BaseResponse<RawData[]>
): Promise<ToBeRenderedData | ToastEntity> {
  if (rawData.error) {
    return ToastEntity.fromCode(rawData.error.code);
  }

  if (!rawData.data) {
    return ToastEntity.unknownError();
  }

  return new ToBeRenderedData(
    rawData.data.reduce((acc, curr) => acc + curr.price, 0)
  );
}
