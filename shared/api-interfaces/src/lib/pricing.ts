import { Schema, model, Document } from 'mongoose';

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
  category: string[];
  subcategory: string[];
}

interface PricingItem {
  id: string;
  name: string;
  tags: Tags;
  pricing: Pricing[];
  description: string;
}

type PricingData = PricingItem[];

// Elysia Types
import { t } from 'elysia';

const PricingUnitSchema = t.Object({
  quantity: t.Number(),
  unit: t.String()
});

const PricingSchema = t.Object({
  price: t.Number(),
  pricingUnit: t.String(),
  perUnit: PricingUnitSchema
});

const TagsSchema = t.Object({
  category: t.Array(t.String()),
  subcategory: t.Array(t.String())
});

const PricingItemSchema = t.Object({
  id: t.String(),
  name: t.String(),
  tags: TagsSchema,
  pricing: t.Array(PricingSchema),
  description: t.String()
});

const PricingDataSchema = t.Array(PricingItemSchema);

// Mongoose Schema

const pricingUnitSchema = new Schema<PricingUnit>({
  quantity: { type: Number, required: true },
  unit: { type: String, required: true }
});

const pricingSchema = new Schema<Pricing>({
  price: { type: Number, required: true },
  pricingUnit: { type: String, required: true },
  perUnit: { type: pricingUnitSchema, required: true }
});

const tagsSchema = new Schema<Tags>({
  category: { type: [String], required: true },
  subcategory: { type: [String], required: true }
});

const pricingItemSchema = new Schema<PricingItem>({
  name: { type: String, required: true },
  tags: { type: tagsSchema, required: true },
  pricing: { type: [pricingSchema], required: true },
  description: { type: String, default: '' }
});

// Mongoose model
export interface PricingItemDocument extends PricingItem, Document {
  id: string;
}
const MongoPricingItemModel = model('PricingItem', pricingItemSchema);

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
  MongoPricingItemModel
};