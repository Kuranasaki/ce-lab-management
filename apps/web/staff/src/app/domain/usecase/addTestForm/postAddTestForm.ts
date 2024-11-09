import { ToastEntity } from '@ce-lab-mgmt/shared-ui';
import { AddTestFormFormReturned } from '../../entity/addTestForm/addTestFormFormEntity';

export default async function postAddTestForm(
  form: AddTestFormFormReturned
): Promise<ToastEntity> {
  return ToastEntity.success();
}
