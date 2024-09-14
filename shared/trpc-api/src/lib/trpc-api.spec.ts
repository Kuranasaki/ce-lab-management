import { trpcApi } from './trpc-api';

describe('trpcApi', () => {
  it('should work', () => {
    expect(trpcApi()).toEqual('trpc-api');
  });
});
