import 'dotenv/config';

import App from '../server';

test('App.getInstance() must always return the same object', async () => {
  const instance1 = await App.getInstance();
  const instance2 = await App.getInstance();

  expect(instance1).toBe(instance2);
});
