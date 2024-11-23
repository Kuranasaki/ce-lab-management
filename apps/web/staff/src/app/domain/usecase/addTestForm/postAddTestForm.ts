import { ToastEntity } from '@ce-lab-mgmt/shared-ui';
import { AddTestFormFormReturned } from '../../entity/addTestForm/addTestFormFormEntity';
import postAddTestFormRequestMapper from '../../mapper/addTestForm/postAddTestFormRequestMapper';
import postAddTestFormRepository from '../../../data/repositories/addTestForm/postAddTestFormRepository';
import postAddTestFormResponseMapper from '../../mapper/addTestForm/postAddTestFormResponseMapper';

export default async function postAddTestForm(
  form: AddTestFormFormReturned
): Promise<ToastEntity> {
  const request = await postAddTestFormRequestMapper(form);
  const response = await postAddTestFormRepository(request);
  const toast = await postAddTestFormResponseMapper(response);
  return toast;
}
