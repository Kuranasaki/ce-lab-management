import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { PricingTRPCRouter } from '@ce-lab-mgmt/trpc-api';

const client = createTRPCProxyClient<PricingTRPCRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3001/trpc',
    }),
  ],
});

export async function getPricingByID(id: string) {
  return await client.getById.query(id);
}
