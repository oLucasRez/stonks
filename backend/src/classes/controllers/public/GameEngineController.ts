import { Request, Response } from 'express';

import Controller from '../../abstract/Controller';

import GameEngineModel from '../../../models/GameEngineModel';

class GameEngineController extends Controller<GameEngineModel> {
	public indexUrl = '/game-engines';

	public async index(
		_: Request,
		response: Response
	): Promise<Response<GameEngineModel[]>> {
		const gameEngines = await GameEngineModel.findAll();

		return response.json(gameEngines);
	}

	public readUrl = '/game-engine/:id';

	public async read(
		_: Request,
		response: Response
	): Promise<Response<GameEngineModel>> {
		return response.status(404);
	}

	public storeUrl = '/game-engine';

	public async store(
		_: Request,
		response: Response
	): Promise<Response<GameEngineModel>> {
		return response.status(404);
	}

	public updateUrl = '/game-engine/:id';

	public async update(
		request: Request,
		response: Response
	): Promise<Response<GameEngineModel>> {
		return response.status(404);
	}

	public deleteUrl = '/game-engine/:id';

	public async delete(
		_: Request,
		response: Response
	): Promise<Response> {
		return response.status(404);
	}
}

export default new GameEngineController();
