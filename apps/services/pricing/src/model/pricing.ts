import { Document, Schema, model } from 'mongoose';
import { t, Elysia } from 'elysia';
import {
  PricingUnit,
  Pricing,
  PricingItem,
  PricingItemSchema as PricingItemElysiaSchema,
  MongoPricingItemModel,
  PricingItemDocument,
  TagsSchema,
  PricingSchema,
} from '@ce-lab-mgmt/api-interfaces';

// export { PricingItemDocument as IPricing };

export const PricingModel = new Elysia({ name: 'Model.Experiment' }).model({
  'prices.success': t.Object({
    data: t.Array(PricingItemElysiaSchema),
  }),
  'price.success': t.Object({
    data: PricingItemElysiaSchema,
  }),
  'price.notFound': t.Object({
    error: t.Object({ code: t.Number() }),
  }),
  'price.error': t.Object({
    error: t.Object({ code: t.Number() }),
  }),
  'price.requestBody': t.Object({
    name: t.String(),
    tags: TagsSchema,
    pricing: t.Array(PricingSchema),
    description: t.String(),
  }),
});

export default MongoPricingItemModel;
