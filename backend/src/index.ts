import 'dotenv/config';
import http from 'http';

import GameEngineModel from './models/GameEngineModel';
import GameModeModel from './models/GameModeModel';

import GenreModel from './models/GenreModel';
import KeywordModel from './models/KeywordModel';
import PlayerPerspectiveModel from './models/PlayerPerspectiveModel';
import ThemeModel from './models/ThemeModel';

import App from './server';

import DatabaseInitializer from './services/database/config/DatabaseInitializer';

async function runServer() {
	const server = await App.getInstance();

	const databaseConfiguration = new DatabaseInitializer();
	databaseConfiguration.InitDatabase();

	server.get('/genres', async (_, response) => {
		const genres = await GenreModel.findAll();

		return response.json(genres);
	});

	server.get('/themes', async (_, response) => {
		const themes = await ThemeModel.findAll();

		return response.json(themes);
	});

	server.get('/keywords', async (request, response) => {
		const { page } = request.query;

		if (!page) {
			return response.status(400).json({
				error: 'Expected property "page" on query params',
			});
		}

		const pageNumber = Number.parseInt(page as string, 10);

		const limit = 500;

		const keywords = await KeywordModel.findAll({
			limit,
			offset: pageNumber * limit,
		});

		return response.json(keywords);
	});

	server.get('/game-engines', async (_, response) => {
		const gameEngines = await GameEngineModel.findAll();

		return response.json(gameEngines);
	});

	server.get('/player-perspectives', async (_, response) => {
		const playerPerspectives = await PlayerPerspectiveModel.findAll();

		return response.json(playerPerspectives);
	});

	server.get('/game-modes', async (_, response) => {
		const gameModes = await GameModeModel.findAll();

		return response.json(gameModes);
	});

	const httpServer = http.createServer(server);

	httpServer.listen(4000, () => {
		console.log('[SERVER]: HTTP:4000 ON');
	});
}

runServer();
