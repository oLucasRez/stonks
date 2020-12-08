import 'dotenv/config';
import http from 'http';

import DatabaseInitializer from './services/database/config/DatabaseInitializer';

import App from './server';

async function runServer() {
	const databaseConfiguration = new DatabaseInitializer();
	databaseConfiguration.InitDatabase();

	const server = await App.getInstance();

	const httpServer = http.createServer(server);

	httpServer.listen(4000, '0.0.0.0', () => {
		console.log('[SERVER]: HTTP:4000 ON');
	});
}

runServer();
