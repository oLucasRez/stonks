import { Request, Response } from 'express';

abstract class Controller<T> {
	abstract indexUrl: string;

	abstract async index(
		request: Request,
		response: Response
	): Promise<Response<T[]>>;

	abstract readUrl: string;

	abstract async read(
		request: Request,
		response: Response
	): Promise<Response<T>>;

	abstract storeUrl: string;

	abstract async store(
		request: Request,
		response: Response
	): Promise<Response<T>>;

	abstract updateUrl: string;

	abstract async update(
		request: Request,
		response: Response
	): Promise<Response<T>>;

	abstract deleteUrl: string;

	abstract async delete(
		request: Request,
		response: Response
	): Promise<Response>;
}

export default Controller;
