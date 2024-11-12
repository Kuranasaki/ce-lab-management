import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { PricingTRPCRouter } from '@ce-lab-mgmt/trpc-api';

const client = createTRPCProxyClient<PricingTRPCRouter>({
  links: [
    httpBatchLink({
      url: 'localhost:3001',
    }),
  ],
});

export async function getPricingByID(id: string) {
  return await client.getById.query(id);
}
