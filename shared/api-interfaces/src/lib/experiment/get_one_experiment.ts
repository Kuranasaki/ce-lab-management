import { ExperimentOrderSchema } from './experiment';

import { TExperimentOrder } from './experiment'

export type GetExperimentResponse = TExperimentOrder
 
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
