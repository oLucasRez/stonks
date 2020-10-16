import 'dotenv/config';

import NLPApi from '../services/NLPApi';

test('NLPApi.getInstance() must always return the same object', () => {
  const instance1 = NLPApi.getInstance();
  const instance2 = NLPApi.getInstance();

  expect(instance1).toBe(instance2);
});
