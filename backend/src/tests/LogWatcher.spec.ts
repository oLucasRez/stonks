import { resolve } from 'path';

import FileWatcher from '../classes/IO/FileWatcher';

test('NLPApi.getInstance() must always return the same object', () => {
	const instance1 = FileWatcher.getInstance(
		resolve(__dirname, '../log/fetched_ids.log')
	);

	const instance2 = FileWatcher.getInstance(
		resolve(__dirname, '../log/fetched_ids.log')
	);

	expect(instance1).toBe(instance2);
});
