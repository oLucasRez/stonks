import 'dotenv/config';

import IGDBApi from '../services/IGDB';

test('IGDBApi.getInstance() must always return the same object', async () => {
  const instance1 = await IGDBApi.getInstance();
  const instance2 = await IGDBApi.getInstance();

  expect(instance1).toBe(instance2);
});
