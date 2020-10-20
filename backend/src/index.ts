import 'dotenv/config';
import IGDBCallTest from './classes/IGDBCallTest';
import Connection from './services/DB/Connection';

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
var DB: Connection = new Connection();
DB.insert(
	'game_mode',
	'id,name,slug',
	"id.nextval,'teste','teste'"
);
DB.showRows('game_mode');
//DB.delete('game_mode', 'name=teste');
//makeCall();
