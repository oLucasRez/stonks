import { Request, Response } from 'express';

import Controller from '../../abstract/Controller';

import KeywordModel from '../../../models/KeywordModel';

class KeywordController extends Controller<KeywordModel> {
	public indexUrl = '/keywords';

	public async index(
		request: Request,
		response: Response
	): Promise<Response<KeywordModel[]>> {
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
	}

	public readUrl = '/keyword/:id';

	public async read(
		_: Request,
		response: Response
	): Promise<Response<KeywordModel>> {
		return response.status(404);
	}

	public storeUrl = '/keyword';

	public async store(
		_: Request,
		response: Response
	): Promise<Response<KeywordModel>> {
		return response.status(404);
	}

	public updateUrl = '/keyword/:id';

	public async update(
		request: Request,
		response: Response
	): Promise<Response<KeywordModel>> {
		return response.status(404);
	}

	public deleteUrl = '/keyword/:id';

	public async delete(
		_: Request,
		response: Response
	): Promise<Response> {
		return response.status(404);
	}
}

export default new KeywordController();
