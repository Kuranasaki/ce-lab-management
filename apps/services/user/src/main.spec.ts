import { expect, test } from 'bun:test';

import { userSvc } from './index';

test('userSvc should work', () => {
  expect(userSvc()).toBe('user-svc');
});
