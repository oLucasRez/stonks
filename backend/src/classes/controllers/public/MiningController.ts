import Axios from 'axios';
import { Request, Response } from 'express';

import Controller from '../../abstract/Controller';

class MiningController extends Controller<any> {
	public indexUrl = '/mining';

	public async index(
		request: Request,
		response: Response
	): Promise<Response<any[]>> {
		return response.status(404);
	}

	public readUrl = '/mining/:id';

	public async read(
		_: Request,
		response: Response
	): Promise<Response<any>> {
		return response.status(404);
	}

	public storeUrl = '/mining';

	public async store(
		request: Request,
		response: Response
	): Promise<Response<any>> {
		const { body } = request;

		const { data } = await Axios.post(
			'http://mining:5500/',
			body
		);

		return response.send(data);
	}

	public updateUrl = '/mining/:id';

	public async update(
		request: Request,
		response: Response
	): Promise<Response<any>> {
		return response.status(404);
	}

	public deleteUrl = '/mining/:id';

	public async delete(
		_: Request,
		response: Response
	): Promise<Response> {
		return response.status(404);
	}
}

export default new MiningController();
