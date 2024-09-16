import { Elysia, t, Handler } from 'elysia';
import Pricing, { IPricing, PricingModel } from '../model/pricing';

export const PricingController = new Elysia({ prefix: '/pricing' })
  .use(PricingModel)
  .post(
    '/',
    async ({ body, set }) => {
      try {
        const newPrice = new Pricing();
        newPrice.id = newPrice._id;
        newPrice.label = body.label;
        newPrice.price = body.price;

        const savedPrice = await newPrice.save();

        set.status = 200;

        return {
          success: true,
          price: savedPrice,
        };
      } catch (err: any) {
        console.log(err);

        set.status = 500;
        return {
          success: false,
          message: 'Failed to create price',
          error: err.message,
        };
      }
    },
    {
      detail: {
        tags: ['Pricing'],
        description: 'Post new pricing',
      },
      body: 'price.requestBody',
      response: {
        200: 'price.success',
        500: 'price.error',
      },
    }
  )
  .get(
    '/',
    async ({ set }) => {
      try {
        const allPrices = await Pricing.find({});
        set.status = 200;
        return {
          success: true,
          prices: allPrices,
        };
      } catch (err: any) {
        console.log(err);

        set.status = 500;
        return {
          success: false,
          message: 'Failed to fetch prices',
          error: err.message,
        };
      }
    },
    {
      detail: {
        tags: ['Pricing'],
        description: 'Get all pricing',
      },
      response: {
        200: 'prices.success',
        500: 'price.error',
      },
    }
  )
  .get(
    '/:id',
    async ({ params: { id }, set }) => {
      try {
        const foundPrice = await Pricing.findById(id);

        if (!foundPrice) {
          set.status = 404;
          return {
            success: false,
            message: 'Price not found',
          };
        }

        set.status = 200;
        return {
          success: true,
          price: foundPrice,
        };
      } catch (err: any) {
        console.log(err);

        set.status = 500;
        return {
          success: false,
          message: 'Failed to fetch price',
          error: err.message,
        };
      }
    },
    {
      detail: {
        tags: ['Pricing'],
        description: 'Get pricing by id',
      },
      response: {
        200: 'price.success',
        404: 'price.notFound',
        500: 'price.error',
      },
    }
  )
  .delete(
    '/:id',
    async ({ params: { id }, set }) => {
      try {
        const deletedPrice = await Pricing.findByIdAndDelete(id);

        console.log(deletedPrice);

        if (!deletedPrice) {
          set.status = 404;
          return {
            success: false,
            message: 'Price not found',
          };
        }

        set.status = 200;
        return {
          success: true,
          price: deletedPrice,
        };
      } catch (err: any) {
        console.log(err);

        set.status = 500;
        return {
          success: false,
          message: 'Failed to delete price',
          error: err.message,
        };
      }
    },
    {
      detail: {
        tags: ['Pricing'],
        description: 'Delete pricing by id',
      },
      response: {
        200: 'price.success',
        404: 'price.notFound',
        500: 'price.error',
      },
    }
  );
