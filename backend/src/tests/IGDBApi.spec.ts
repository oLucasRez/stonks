import IGDBApi from '../services/igdb';

test('IGDBApi.getInstance() must always return the same object', () => {
  const instance1 = IGDBApi.getInstance();
  const instance2 = IGDBApi.getInstance();

  expect(instance1).toBe(instance2);
});
