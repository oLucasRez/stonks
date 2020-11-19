import { Request, Response } from 'express';

import Controller from '../../abstract/Controller';

import GameModeModel from '../../../models/GameModeModel';

class GameModeController extends Controller<GameModeModel> {
	public indexUrl = '/game-modes';

	public async index(
		_: Request,
		response: Response
	): Promise<Response<GameModeModel[]>> {
		const gameModes = await GameModeModel.findAll();

		return response.json(gameModes);
	}

	public readUrl = '/game-mode/:id';

	public async read(
		_: Request,
		response: Response
	): Promise<Response<GameModeModel>> {
		return response.status(404);
	}

	public storeUrl = '/game-mode';

	public async store(
		_: Request,
		response: Response
	): Promise<Response<GameModeModel>> {
		return response.status(404);
	}

	public updateUrl = '/game-mode/:id';

	public async update(
		request: Request,
		response: Response
	): Promise<Response<GameModeModel>> {
		return response.status(404);
	}

	public deleteUrl = '/game-mode/:id';

	public async delete(
		_: Request,
		response: Response
	): Promise<Response> {
		return response.status(404);
	}
}

export default new GameModeController();
