import { Request, Response } from 'express';

import Controller from '../../abstract/Controller';

import ThemeModel from '../../../models/ThemeModel';

class ThemeController extends Controller<ThemeModel> {
	public indexUrl = '/themes';

	public async index(
		_: Request,
		response: Response
	): Promise<Response<ThemeModel[]>> {
		const themes = await ThemeModel.findAll();

		return response.json(themes);
	}

	public readUrl = '/theme/:id';

	public async read(
		_: Request,
		response: Response
	): Promise<Response<ThemeModel>> {
		return response.status(404);
	}

	public storeUrl = '/theme';

	public async store(
		_: Request,
		response: Response
	): Promise<Response<ThemeModel>> {
		return response.status(404);
	}

	public updateUrl = '/theme/:id';

	public async update(
		request: Request,
		response: Response
	): Promise<Response<ThemeModel>> {
		return response.status(404);
	}

	public deleteUrl = '/theme/:id';

	public async delete(
		_: Request,
		response: Response
	): Promise<Response> {
		return response.status(404);
	}
}

export default new ThemeController();
