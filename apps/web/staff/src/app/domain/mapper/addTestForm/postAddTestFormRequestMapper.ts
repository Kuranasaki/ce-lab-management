import { CreateTestFormRequestSchema } from '@ce-lab-mgmt/api-interfaces';
import { AddTestFormFormReturned } from '../../entity/addTestForm/addTestFormFormEntity';

export default async function postAddTestFormRequestMapper(
  form: AddTestFormFormReturned
): Promise<typeof CreateTestFormRequestSchema.static> {
  return { ...form.getValues() };
}
