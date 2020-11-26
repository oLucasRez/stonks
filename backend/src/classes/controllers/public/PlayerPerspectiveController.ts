import { Request, Response } from 'express';

import Controller from '../../abstract/Controller';

import PlayerPerspectiveModel from '../../../models/PlayerPerspectiveModel';

class PlayerPerspectiveController extends Controller<
	PlayerPerspectiveModel
> {
	public indexUrl = '/player-perspectives';

	public async index(
		_: Request,
		response: Response
	): Promise<Response<PlayerPerspectiveModel[]>> {
		const playerPerspectives = await PlayerPerspectiveModel.findAll();

		return response.json(playerPerspectives);
	}

	public readUrl = '/player-perspective/:id';

	public async read(
		_: Request,
		response: Response
	): Promise<Response<PlayerPerspectiveModel>> {
		return response.status(404);
	}

	public storeUrl = '/player-perspective';

	public async store(
		_: Request,
		response: Response
	): Promise<Response<PlayerPerspectiveModel>> {
		return response.status(404);
	}

	public updateUrl = '/player-perspective/:id';

	public async update(
		request: Request,
		response: Response
	): Promise<Response<PlayerPerspectiveModel>> {
		return response.status(404);
	}

	public deleteUrl = '/player-perspective/:id';

	public async delete(
		_: Request,
		response: Response
	): Promise<Response> {
		return response.status(404);
	}
}

export default new PlayerPerspectiveController();
