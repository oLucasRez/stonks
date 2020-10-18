import 'dotenv/config';

import App from './server';

async function runServer() {
	const server = await App.getInstance();

	// eslint-disable-next-line no-console
	server.listen(4000, () => console.log('[SERVER]: ON'));
}

runServer();
