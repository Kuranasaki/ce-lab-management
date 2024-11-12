import { t, Static, TSchema } from 'elysia';

export const ExperimentResultSchema = t.Object({
  experimentID: t.String(),
  recorderID: t.String(),
  result: t.Any(),
  comment: t.String(),
});

export interface TExperimentResult<T = unknown>
  extends Static<typeof ExperimentResultSchema> {
  data: T;
}

export const ExperimentResultSchemaFn = <T extends TSchema>(dataSchema: T) =>
  t.Object({
    experimentID: t.String(),
    recorderID: t.String(),
    result: dataSchema,
    comment: t.String(),
  });
