import { Request, Response } from 'express';

import Controller from '../../abstract/Controller';

import GenreModel from '../../../models/GenreModel';

class GenreController extends Controller<GenreModel> {
	public indexUrl = '/genres';

	public async index(
		_: Request,
		response: Response
	): Promise<Response<GenreModel[]>> {
		const genres = await GenreModel.findAll();

		return response.json(genres);
	}

	public readUrl = '/genre/:id';

	public async read(
		_: Request,
		response: Response
	): Promise<Response<GenreModel>> {
		return response.status(404);
	}

	public storeUrl = '/genre';

	public async store(
		_: Request,
		response: Response
	): Promise<Response<GenreModel>> {
		return response.status(404);
	}

	public updateUrl = '/genre/:id';

	public async update(
		request: Request,
		response: Response
	): Promise<Response<GenreModel>> {
		return response.status(404);
	}

	public deleteUrl = '/genre/:id';

	public async delete(
		_: Request,
		response: Response
	): Promise<Response> {
		return response.status(404);
	}
}

export default new GenreController();
