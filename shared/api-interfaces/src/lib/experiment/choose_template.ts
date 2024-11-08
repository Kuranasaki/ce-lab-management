import { t } from 'elysia';

// Professor choose template for experiment -> copy test form to experiment
/*
Request
- POST: /experiment/:id/choose-template
- Body: ChooseTemplateRequestSchema

Response
- Status: 200
- Body: ChooseTemplateResponseSchema
*/

export const ChooseTemplateRequestSchema = t.Object({
  testFormID: t.String(),
});

export const ChooseTemplateResponseSchema = t.Object({
  id: t.String(), // Experiment ID
  testFormURL: t.String(),
});
