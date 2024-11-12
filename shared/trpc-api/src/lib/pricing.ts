import { t } from 'elysia';
import { initTRPC } from '@trpc/server';
import { compile as c } from '@elysiajs/trpc';
import { MongoPricingItemModel } from '@ce-lab-mgmt/api-interfaces';

const tRPC = initTRPC.create();

// Define tRPC router

export const pricingTrpcRouter = tRPC.router({
  // getAll: tRPC.procedure.query(async () => {
  //   const prices = await MongoPricingItemModel.find({});
  //   return prices.map((p) => ({
  //     name: p.name,
  //     id: (p._id as string).toString(),
  //     tags: p.tags,
  //     pricing: p.pricing,
  //     description: p.description,
  //   }));
  // }),

  getById: tRPC.procedure.input(c(t.String())).query(async (id) => {
    console.log('id', id);
    const price = await MongoPricingItemModel.findById(id);
    console.log('price', price);
    if (!price) throw new Error('Price not found');
    return {
      name: price.name,
      id: (price._id as string).toString(),
      tags: price.tags,
      pricing: price.pricing,
      description: price.description,
    };
  }),
});

export type PricingTRPCRouter = typeof pricingTrpcRouter;
