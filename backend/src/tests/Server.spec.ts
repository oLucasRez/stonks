import App from '../server';

test('App.getInstance() must always return the same object', () => {
  const instance1 = App.getInstance();
  const instance2 = App.getInstance();

  expect(instance1).toBe(instance2);
});
