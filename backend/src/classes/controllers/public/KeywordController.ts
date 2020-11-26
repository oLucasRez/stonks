import { Request, Response } from 'express';
import { Op } from 'sequelize';

import Controller from '../../abstract/Controller';

import KeywordModel from '../../../models/KeywordModel';

class KeywordController extends Controller<KeywordModel> {
	public indexUrl = '/keywords';

	public async index(
		request: Request,
		response: Response
	): Promise<Response<KeywordModel[]>> {
		const { startString } = request.query;

		if (!startString) {
			return response.status(400).json({
				error: 'Expected property "startString" on query params',
			});
		}

		const keywords = await KeywordModel.findAll({
			where: {
				name: {
					[Op.iLike]: `${startString}%`,
				},
			},
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
