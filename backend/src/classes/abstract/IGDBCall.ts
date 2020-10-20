import { AxiosError, AxiosResponse } from 'axios';

import IGDB from '../../services/IGDB';

import IGDBRequestAdapter from '../adapters/IGDBRequestAdapter';

import {
	IIGDBAssertion,
	IIGDBRequestBody,
} from '../../typescript/services/IGDB/RequestBody';

abstract class IGDBCall {
	private identifier: string;

	abstract idStep: number;

	abstract idLowerLimit: number;

	abstract idHigherLimit: number;

	constructor(identifier: string) {
		this.identifier = identifier;
	}

	/**
	 * The body of the request
	 * @returns A object that representes the 'Basic Text' body of the request.
	 */
	protected abstract requestBody(): IIGDBRequestBody;

	/**
	 * Handle the data incoming
	 * @param response the AxiosResponse object
	 * @returns The new saved id's of the correspondent IGDB Api endpoint.
	 */
	protected abstract handleResponse(
		response: AxiosResponse
	): string[];

	/**
	 * Handle any exception that may occur on the request
	 * @param error The error caught by the exception
	 * @param body The IIGDBRequestBody object sent to the request
	 * @param bodyString The string that represents the IIGDBRequestBody object
	 * @param identifier The identifier of the IGDB Api endpoint
	 */
	protected abstract handleRequestException(
		error: AxiosError,
		body: IIGDBRequestBody,
		bodyString: string,
		identifier: string
	): void;

	public async call(): Promise<void> {
		await this.request();
	}

	private insertIdExclusionOnRequestBody(
		requestBody: IIGDBRequestBody
	): IIGDBRequestBody {
		const newRequestBody = requestBody;

		if (!newRequestBody.where) {
			newRequestBody.where = { assertions: [] };
		}

		const lowerLimitAssertion: IIGDBAssertion = {
			property: 'id',
			boolOperator: '>=',
			value: `${this.idLowerLimit}`,
		};

		newRequestBody.where.assertions.push(lowerLimitAssertion);

		const higherLimitAssertion: IIGDBAssertion = {
			property: 'id',
			boolOperator: '<=',
			value: `${this.idHigherLimit}`,
		};

		newRequestBody.where.assertions.push(higherLimitAssertion);

		return requestBody;
	}

	private async request(): Promise<void> {
		const requestBody = this.requestBody();

		const modifiedRequestBody = this.insertIdExclusionOnRequestBody(
			requestBody
		);

		const body = IGDBRequestAdapter.adaptToRequestBodyString(
			modifiedRequestBody
		);

		const IGDBInstance = await IGDB.getInstance();

		const IGDBApi = await IGDBInstance.getAPI();

		try {
			console.log(`[IGDB]: Request with body: ${body}`);

			console.log(`[IGDB]: Endpoint: ${this.identifier}`);

			const response = await IGDBApi.post(
				`/${this.identifier}`,
				body
			);

			this.handleResponse(response);

			this.idLowerLimit += this.idStep;
			this.idHigherLimit += this.idStep;
		} catch (error) {
			this.handleRequestException(
				error,
				requestBody,
				body,
				this.identifier
			);
		}
	}
}

export default IGDBCall;
