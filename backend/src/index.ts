import 'dotenv/config';
import http from 'http';

import App from './server';

import DatabaseInitializer from './services/database/config/DatabaseInitializer';

async function runServer() {
	const server = await App.getInstance();

	const databaseConfiguration = new DatabaseInitializer();
	databaseConfiguration.InitDatabase();

	const httpServer = http.createServer(server);

	httpServer.listen(4000, () => {
		console.log('[SERVER]: HTTP:4000 ON');
	});
}

runServer();
