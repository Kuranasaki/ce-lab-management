import { Elysia, Static, t } from 'elysia';
import MongoPricingItemModel, { PricingModel, PricingItemSchema as PricingItemElysiaSchema  } from '../model/pricing';
// import { PricingItemSchema as PricingItemElysiaSchema } from '@ce-lab-mgmt/api-interfaces';

export const PricingController = new Elysia({ prefix: '/pricing' })
  .use(PricingModel)
  // .post(
  //   '/',
  //   async ({ body, set }) => {
  //     try {
  //       const newPrice = new MongoPricingItemModel(body);
  //       const savedPrice = await newPrice.save();
  //       const formattedPrice: Static<typeof PricingItemElysiaSchema> = {
  //         name: savedPrice.name,
  //         id: (savedPrice._id as string).toString(),
  //         tags: savedPrice.tags,
  //         pricing: savedPrice.pricing,
  //         description: savedPrice.description,
  //       };
  //       set.status = 200;
  //       return { data: formattedPrice };
  //     } catch (error: any) {
  //       set.status = 500;
  //       return {
  //         error: { code: 500 },
  //       };
  //     }
  //   },
  //   {
  //     detail: {
  //       tags: ['Pricing'],
  //       description: 'Post new pricing',
  //     },
  //     body: 'price.requestBody',
  //     response: {
  //       200: 'price.success',
  //       500: 'price.error',
  //     },
  //   }
  // )
  // .post(
  //   '/addMany',
  //   async ({ body, set }) => {
  //     try {
  //       // Ensure body is an array
  //       if (!Array.isArray(body)) {
  //         set.status = 400;
  //         return { error: { code: 400 } };
  //       }

  //       const newPrices = body.map(
  //         (priceData) => new MongoPricingItemModel(priceData)
  //       );

  //       const savedPrices = await MongoPricingItemModel.insertMany(newPrices);

  //       const formattedPrices: Static<typeof PricingItemElysiaSchema>[] =
  //         savedPrices.map((p) => ({
  //           name: p.name,
  //           id: (p._id as string).toString(),
  //           tags: p.tags,
  //           pricing: p.pricing,
  //           description: p.description,
  //         }));

  //       set.status = 200;
  //       return { data: formattedPrices };
  //     } catch (error: any) {
  //       console.error(error);
  //       set.status = 500;
  //       return {
  //         error: { code: 500 },
  //       };
  //     }
  //   },
  //   {
  //     detail: {
  //       tags: ['Pricing'],
  //       description: 'Post new pricing in bulk',
  //     },
  //     body: 'price.requestBodyArray', // The request body should be defined as an array of price objects
  //     response: {
  //       200: 'prices.success',
  //       400: 'price.error',
  //       500: 'price.error',
  //     },
  //   }
  // )

  .get(
    '/',
    async ({ set }) => {
      try {
        const prices = await MongoPricingItemModel.find({});
        const formattedPrices: Static<typeof PricingItemElysiaSchema>[] =
          prices.map((p) => ({
            name: p.name,
            id: (p._id as string).toString(),
            tags: p.tags,
            pricing: p.pricing,
            description: p.description,
          }));
        set.status = 200;
        return { data: formattedPrices };
      } catch (error: any) {
        console.log('error', error);
        set.status = 500;
        return { error: { code: 500 } };
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
        if (!price) {
          set.status = 404;
          return { error: { code: 404 } };
        }
        const formattedPrice: Static<typeof PricingItemElysiaSchema> = {
          name: price.name,
          id: (price._id as string).toString(),
          tags: price.tags,
          pricing: price.pricing,
          description: price.description,
        };
        return { data: formattedPrice };
      } catch (error: any) {
        set.status = 500;
        return { error: { code: 500 } };
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
  );

// .delete(
//   '/:id',
//   async ({ params: { id }, set }) => {
//     try {
//       const deletedPrice = await MongoPricingItemModel.findByIdAndDelete(id);
//       if (!deletedPrice) {
//         set.status = 404;
//         return { error: { code: 404 } };
//       }
//       const formattedPrice: Static<typeof PricingItemElysiaSchema> = {
//         name: deletedPrice.name,
//         id: (deletedPrice._id as string).toString(),
//         tags: deletedPrice.tags,
//         pricing: deletedPrice.pricing,
//         description: deletedPrice.description,
//       };
//       return { data: formattedPrice };
//     } catch (error: any) {
//       set.status = 500;
//       return { error: { code: 500 } };
//     }
//   },
//   {
//     detail: {
//       tags: ['Pricing'],
//       description: 'Delete pricing by id',
//     },
//     params: t.Object({
//       id: t.String(),
//     }),
//     response: {
//       200: 'price.success',
//       404: 'price.notFound',
//       500: 'price.error',
//     },
//   }
// );
