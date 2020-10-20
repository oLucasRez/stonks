import 'dotenv/config';
import IGDBCallTest from './classes/IGDBCallTest';

import App from './server';

async function runServer() {
	const server = await App.getInstance();

	// eslint-disable-next-line no-console
	server.listen(4000, () => console.log('[SERVER]: ON'));
}

runServer();

const IGDBCall = new IGDBCallTest('games');

async function makeCall() {
	while (true) {
		// eslint-disable-next-line no-await-in-loop
		await IGDBCall.call();
	}
}

makeCall();
