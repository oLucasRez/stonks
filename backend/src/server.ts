import express, { Express } from 'express';
import cors from 'cors';

import Controller from './classes/abstract/Controller';

import GameEngineController from './classes/controllers/public/GameEngineController';
import GameModeController from './classes/controllers/public/GameModeController';
import GenreController from './classes/controllers/public/GenreController';
import KeywordController from './classes/controllers/public/KeywordController';
import PlayerPerspectiveController from './classes/controllers/public/PlayerPerspectiveController';
import ThemeController from './classes/controllers/public/ThemeController';
import MiningController from './classes/controllers/public/MiningController';

const controllers: Controller<never>[] = [
	GameEngineController,
	GameModeController,
	GenreController,
	KeywordController,
	PlayerPerspectiveController,
	ThemeController,
	MiningController,
];

class App {
	public static server: Express;

	public static async getInstance(): Promise<Express> {
		if (!this.server) {
			this.createServerInstance();
		}

		return this.server;
	}

	private static createServerInstance(): void {
		this.server = express();

		this.configureServer();
		this.configureRoutes();
	}

	private static configureServer(): void {
		this.server.use(express.json());
		this.server.use(cors());
	}

	private static configureRoutes(): void {
		for (let i = 0; i < controllers.length; i += 1) {
			const controller = controllers[i];

			this.server.get(controller.indexUrl, controller.index);
			this.server.get(controller.readUrl, controller.read);
			this.server.post(controller.storeUrl, controller.store);
			this.server.put(controller.updateUrl, controller.update);
			this.server.delete(
				controller.deleteUrl,
				controller.delete
			);
		}
	}
}

export default App;
