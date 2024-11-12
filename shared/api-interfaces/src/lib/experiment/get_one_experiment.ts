import { ExperimentOrderSchema } from './experiment';

export { TExperimentOrder as GetExperimentResponse } from './experiment'
 
// Get one experiment by id
/*
Request
- GET: /experiment/:id
- No request body

Response
- Status: 200
- Body: GetOneExperimentResponseSchema
*/


/**
 * @deprecated Use ExperimentOrderSchema instead
 */
export const GetOneExperimentResponseSchema = ExperimentOrderSchema
