import { Elysia, t } from 'elysia';
import { PricingDataSchema } from '@ce-lab-mgmt/api-interfaces';
import MongoPricingItemModel, { PricingModel } from '../model/pricing';

export const PricingController = new Elysia({ prefix: '/pricing' })
  .use(PricingModel)
  .post(
    '/',
    async ({ body, set }) => {
      try {
        const newPrice = new MongoPricingItemModel(body);
        const savedPrice = await newPrice.save();
        set.status = 200;
        return { success: true, price: savedPrice };
      } catch (error: any) {
        set.status = 500;
        return {
          success: false,
          message: 'Failed to create pricing item',
          error: error.message,
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
        const prices = await MongoPricingItemModel.find({});
        set.status = 200;
        return { success: true, prices };
      } catch (error: any) {
        set.status = 500;
        return {
          success: false,
          message: 'Failed to fetch pricing items',
          error: error.message,
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
        const price = await MongoPricingItemModel.findById({ _id: id });
        console.log('price', price);
        if (!price) {
          set.status = 404;
          return { success: false, message: 'Pricing item not found' };
        }
        return { success: true, price };
      } catch (error: any) {
        set.status = 500;
        return {
          success: false,
          message: 'Failed to fetch pricing item',
          error: error.message,
        };
      }
    },
    {
      detail: {
        tags: ['Pricing'],
        description: 'Get pricing by id',
      },
      params: t.Object({
        id: t.String(),
      }),
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
        const deletedPrice = await MongoPricingItemModel.findByIdAndDelete(id);
        if (!deletedPrice) {
          set.status = 404;
          return { success: false, message: 'Pricing item not found' };
        }
        return { success: true, price: deletedPrice };
      } catch (error: any) {
        set.status = 500;
        return {
          success: false,
          message: 'Failed to delete pricing item',
          error: error.message,
        };
      }
    },
    {
      detail: {
        tags: ['Pricing'],
        description: 'Delete pricing by id',
      },

      params: t.Object({
        id: t.String(),
      }),
      response: {
        200: 'price.success',
        404: 'price.notFound',
        500: 'price.error',
      },
    }
  );
