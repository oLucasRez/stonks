import SteamAPI from '../services/steam';

test('SteamAPI.getInstance() must always return the same object', () => {
  const instance1 = SteamAPI.getInstance();
  const instance2 = SteamAPI.getInstance();

  expect(instance1).toBe(instance2);
});
