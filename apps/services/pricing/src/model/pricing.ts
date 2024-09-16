import { Document, Schema, model } from 'mongoose';
import { t, Elysia } from 'elysia';

export interface IPricing extends Document {
  id: string;
  label: string;
  price: number;
}

const schema = new Schema<IPricing>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    label: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const PricingModel = new Elysia({ name: 'Model.Experiment' }).model({
  'prices.success': t.Object({
    success: t.Boolean(),
    prices: t.Array(
      t.Object({
        id: t.String(),
        label: t.String(),
        price: t.Number(),
      })
    ),
  }),
  'price.success': t.Object({
    success: t.Boolean(),
    price: t.Object({
      id: t.String(),
      label: t.String(),
      price: t.Number(),
    }),
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

export default model<IPricing>('price', schema);
