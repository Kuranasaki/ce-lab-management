import { Elysia } from 'elysia';
import { swagger } from '@elysiajs/swagger';
import { cors } from '@elysiajs/cors';
import { PricingController } from './controllers/pricing.controller';

import './database/db.setup';
import { trpc } from '@elysiajs/trpc';
import { pricingTrpcRouter } from '@ce-lab-mgmt/trpc-api';

const app = new Elysia()
  .use(
    swagger({
      provider: 'scalar',
      path: '/swagger',
      documentation: {
        info: {
          title: 'CE Lab API Documentation',
          version: '1.0.0',
        },
        tags: [{ name: 'Pricing', description: 'Pricing endpoints' }],
      },
    })
  )
  .use(cors())
  .use(PricingController)
  .use(trpc(pricingTrpcRouter))
  .listen(3001);

export type PricingServiceType = typeof app;

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
