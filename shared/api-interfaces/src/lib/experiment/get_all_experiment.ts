import { TExperimentOrder } from './experiment';
import { GetOneExperimentResponseSchema } from './get_one_experiment';
import { t } from 'elysia';


type GetAllExperimantResponse = TExperimentOrder[];

export { GetAllExperimantResponse }

// Get all experiment for professor
/* 
Request
- Get: /experiment
- No request body
- QueryParams: GetAllExperimentRequestParamsSchema

Response
- Status: 200
- Body: GetAllExperimentResponseSchema
*/

export const GetAllExperimentRequestParamsSchema = t.Object({
  reservationID: t.Optional(t.String()),
});


export const GetAllExperimentResponseSchema = t.Array(
  GetOneExperimentResponseSchema
);
