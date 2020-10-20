import 'dotenv/config';
import IGDBCallTest from './classes/IGDBCallTest';

import App from './server';
import ThemeModel from './typescript/DB/Models/ThemeModel';

async function runServer() {
	const server = await App.getInstance();

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

// makeCall();

const theme: ThemeModel = new ThemeModel({
	name: 'Puzzle',
	slug: 'puzzle',
});

const reslt = theme.save();

console.log(reslt);
