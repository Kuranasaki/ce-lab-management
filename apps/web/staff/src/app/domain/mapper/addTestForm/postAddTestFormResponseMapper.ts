import {
  BaseResponse,
  CreateTestFormResponseSchema,
} from '@ce-lab-mgmt/api-interfaces';
import { ToastEntity } from '@ce-lab-mgmt/shared-ui';

export default async function postAddTestFormResponseMapper(
  response: BaseResponse<typeof CreateTestFormResponseSchema.static>
): Promise<ToastEntity> {
  if (response.data) {
    return ToastEntity.fromCode(200);
  }
  return ToastEntity.fromCode(response.error?.code || 500);
}
