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


// TypeScript Types

interface PricingUnit {
  quantity: number;
  unit: string;
}

interface Pricing {
  price: number;
  pricingUnit: string;
  perUnit: PricingUnit;
}

interface Tags {
  category?: string;
  subcategory?: string;
  type: string;
}

interface PricingItem {
  id: string;
  name: string;
  tags: Tags;
  pricing: Pricing[];
  description: string;
}

type PricingData = PricingItem[];

const PricingUnitSchema = t.Object({
  quantity: t.Number(),
  unit: t.String(),
});
const PricingItemSchema = t.Object({
  id: t.String(),
  name: t.String(),
  tags: TagsSchema,
  pricing: t.Array(PricingSchema),
  description: t.String(),
});

const PricingDataSchema = t.Array(PricingItemSchema);

// Mongoose Schema

const pricingUnitSchema = new Schema<PricingUnit>({
  quantity: { type: Number, required: true },
  unit: { type: String, required: true },
});

const pricingSchema = new Schema<Pricing>({
  price: { type: Number, required: true },
  pricingUnit: { type: String, required: true },
  perUnit: { type: pricingUnitSchema, required: true },
});

const tagsSchema = new Schema<Tags>({
  category: { type: String, required: false },
  subcategory: { type: String, required: false },
  type: { type: String, required: true },
});

const pricingItemSchema = new Schema({
  name: { type: String, required: true },
  tags: { type: tagsSchema, required: true },
  pricing: { type: [pricingSchema], required: true },
  description: { type: String, default: '' },
});

// Mongoose model
export interface PricingItemDocument
  extends PricingItem,
    Omit<Document, 'id'> {}
const MongoPricingItemModel = model<PricingItemDocument>(
  'PricingItem',
  pricingItemSchema
);

export default MongoPricingItemModel

export {
  PricingUnit,
  Pricing,
  Tags,
  PricingItem,
  PricingData,
  PricingUnitSchema,
  PricingSchema,
  TagsSchema,
  PricingItemSchema,
  PricingDataSchema,
  MongoPricingItemModel,
};