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
  // {
  //   "name": "Fire-Rating Doors",
  //   "tags": {
  //     "type": "ทดสอบทนไฟ"
  //   },
  //   "pricing": [
  //     {
  //       "price": 49000,
  //       "pricingUnit": "บาท",
  //       "perUnit": {
  //         "quantity": 30,
  //         "unit": "นาที"
  //       }
  //     },
  //     {
  //       "price": 52500,
  //       "pricingUnit": "บาท",
  //       "perUnit": {
  //         "quantity": 60,
  //         "unit": "นาที"
  //       }
  //     },
  //     {
  //       "price": 56000,
  //       "pricingUnit": "บาท",
  //       "perUnit": {
  //         "quantity": 90,
  //         "unit": "นาที"
  //       }
  //     },
  //     {
  //       "price": 59500,
  //       "pricingUnit": "บาท",
  //       "perUnit": {
  //         "quantity": 120,
  //         "unit": "นาที"
  //       }
  //     },
  //     {
  //       "price": 63000,
  //       "pricingUnit": "บาท",
  //       "perUnit": {
  //         "quantity": 150,
  //         "unit": "นาที"
  //       }
  //     },
  //     {
  //       "price": 66500,
  //       "pricingUnit": "บาท",
  //       "perUnit": {
  //         "quantity": 180,
  //         "unit": "นาที"
  //       }
  //     },
  //     {
  //       "price": 70000,
  //       "pricingUnit": "บาท",
  //       "perUnit": {
  //         "quantity": 210,
  //         "unit": "นาที"
  //       }
  //     },
  //     {
  //       "price": 73500,
  //       "pricingUnit": "บาท",
  //       "perUnit": {
  //         "quantity": 240,
  //         "unit": "นาที"
  //       }
  //     }
  //   ],
  //   "description": ""
  // }
});

export default MongoPricingItemModel;
