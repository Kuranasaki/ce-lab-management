import { t, Static } from 'elysia';
export const PricingUnitSchema = t.Object({
  quantity: t.Number(),
  unit: t.String(),
});

export type TPricingUnit = Static<typeof PricingUnitSchema>;

export const PricingSchema = t.Object({
  price: t.Number(),
  pricingUnit: t.String(),
  perUnit: PricingUnitSchema,
});

export type TPricing = Static<typeof PricingSchema>;

export const TagsSchema = t.Object({
  category: t.Optional(t.String()),
  subcategory: t.Optional(t.String()),
  type: t.String(),
});

export type TTags = Static<typeof TagsSchema>;
