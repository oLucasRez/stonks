import { AxiosError, AxiosResponse } from 'axios';

import IGDB from '../../services/IGDB';

import IGDBRequestAdapter from '../adapters/services/IGDBRequestAdapter';

import {
	IIGDBAssertion,
	IIGDBRequestBody,
} from '../../typescript/services/IGDB/RequestBody';

abstract class IGDBCall<T> {
	protected abstract identifier: string;

	protected abstract idStep: number;

	public abstract idLowerLimit: number;

	public abstract idHigherLimit: number;

	protected abstract onlySteam: boolean;

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
	protected abstract async handleResponse(
		response: AxiosResponse<T>
	): Promise<T>;

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

	public async call(): Promise<T | never[]> {
		return this.request();
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

	private insertOnlySteamGamesOnRequestBody(
		requestBody: IIGDBRequestBody
	): IIGDBRequestBody {
		const newRequestBody = requestBody;

		if (!newRequestBody.where) {
			newRequestBody.where = { assertions: [] };
		}

		const lowerLimitAssertion: IIGDBAssertion = {
			property: 'external_games.category',
			boolOperator: '=',
			value: `1`,
		};

		newRequestBody.where.assertions.push(lowerLimitAssertion);

		return requestBody;
	}

	private async request() {
		const requestBody = this.requestBody();

		let modifiedRequestBody = this.insertIdExclusionOnRequestBody(
			requestBody
		);

		if (this.onlySteam) {
			modifiedRequestBody = this.insertOnlySteamGamesOnRequestBody(
				modifiedRequestBody
			);
		}

		const body = IGDBRequestAdapter.adaptToRequestBodyString(
			modifiedRequestBody
		);

		const IGDBInstance = await IGDB.getInstance();

		const IGDBApi = await IGDBInstance.getAPI();

		console.log(`[IGDB]: Request with body: ${body}`);

		console.log(`[IGDB]: Endpoint: ${this.identifier}`);

		try {
			const response = await IGDBApi.post(
				`/${this.identifier}`,
				body
			);

			const result = await this.handleResponse(response);

			this.idLowerLimit += this.idStep;
			this.idHigherLimit += this.idStep;

			return result;
		} catch (error) {
			this.handleRequestException(
				error,
				requestBody,
				body,
				this.identifier
			);

			return [];
		}
	}
}

export default IGDBCall;
