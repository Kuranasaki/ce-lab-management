import { Document, Schema, model } from 'mongoose';
import { t, Elysia } from 'elysia';
import {
  PricingUnit,
  Pricing,
  PricingItem,
  PricingItemSchema as PricingItemElysiaSchema,
  MongoPricingItemModel,
  PricingItemDocument,
} from '@ce-lab-mgmt/api-interfaces';

export { PricingItemDocument as IPricing };

export const PricingModel = new Elysia({ name: 'Model.Experiment' }).model({
  'prices.success': t.Object({
    success: t.Boolean(),
    prices: t.Array(PricingItemElysiaSchema),
  }),
  'price.success': t.Object({
    success: t.Boolean(),
    price: PricingItemElysiaSchema,
  }),
  'price.notFound': t.Object({
    success: t.Boolean(),
    message: t.String(),
  }),
  'price.error': t.Object({
    success: t.Boolean(),
    message: t.String(),
    error: t.String(),
  }),
  'price.requestBody': t.Object({
    label: t.String(),
    price: t.Number(),
  }),
});

export default MongoPricingItemModel;
