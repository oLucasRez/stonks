import SteamAPI from '../services/SteamApi';

test('SteamAPI.getInstance() must always return the same object', () => {
	const instance1 = SteamAPI.getInstance();
	const instance2 = SteamAPI.getInstance();

	expect(instance1).toBe(instance2);
});

test('SteamAPI.getGamePrice() must return a number', async () => {
	const steamAPI = SteamAPI.getInstance();

	const value = await steamAPI.getGamePrice('218620');

	expect(typeof value).toBe('number');
});
