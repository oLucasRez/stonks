import 'dotenv/config';
import IGDBGame from './classes/calls/IGDBGame';

import App from './server';

import DatabaseInitializer from './services/database/config/DatabaseInitializer';

async function runServer() {
	const server = await App.getInstance();

	const databaseConfiguration = new DatabaseInitializer();
	databaseConfiguration.InitDatabase();

	server.listen(4000, () => console.log('[SERVER]: ON'));
}

runServer();

const gameCall: IGDBGame = new IGDBGame();

gameCall.call();
