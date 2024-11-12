import { ExperimentItemSchema } from '@ce-lab-mgmt/api-interfaces';
import { Static, t } from 'elysia';
// export const MongoPricingItemSchema = t.Object({
//   _id: t.String({ format: 'uuid' }),
//   name: t.String({ minLength: 1 }),
//   tags: t.Object({
//     category: t.Optional(t.String()),
//     subcategory: t.Optional(t.String()),
//     type: t.String({ minLength: 1 }),
//   }),
//   pricing: t.Array(
//     t.Object({
//       price: t.Number({ minimum: 0 }),
//       pricingUnit: t.String({ minLength: 1 }),
//       perUnit: t.Object({
//         quantity: t.Number({ minimum: 0 }),
//         unit: t.String({ minLength: 1 }),
//       }),
//     })
//   ),
//   description: t.String(),
//   createdAt: t.String({ format: 'date-time' }),
//   updatedAt: t.String({ format: 'date-time' }),
// });

export const MongoPricingItemSchema = t.Composite([
  ExperimentItemSchema,
  t.Object({
    _id: t.String({ format: 'uuid' }),
    createdAt: t.String({ format: 'date-time' }),
    updatedAt: t.String({ format: 'date-time' }),
  }),
]);

export type MongoPricingItem = Static<typeof MongoPricingItemSchema>;
