import { Document, Schema, model } from 'mongoose';
import { t, Elysia } from 'elysia';
import {
  ExperimentItemSchema,
  TagsSchema,
  PricingSchema,
} from '@ce-lab-mgmt/api-interfaces';

const body = t.Omit(t.Object(ExperimentItemSchema), ['id']);
export const PricingModel = new Elysia({ name: 'Model.Experiment' }).model({
  'prices.success': t.Object({
    data: t.Array(ExperimentItemSchema),
  }),
  'price.success': t.Object({
    data: ExperimentItemSchema,
  }),
  'price.notFound': t.Object({
    error: t.Object({ code: t.Number() }),
  }),
  'price.error': t.Object({
    error: t.Object({ code: t.Number() }),
  }),
  'price.requestBody': body,
  'price.requestBodyArray': t.Array(body),
});
