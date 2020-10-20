import { AxiosResponse } from 'axios';
import { resolve } from 'path';

import IGDB from '../../services/IGDB';

abstract class IGDBCall {
	private identifier: string;

	constructor(identifier: string) {
		this.identifier = identifier;
	}

	/**
	 * The body of the request
	 * @returns A string that representes the 'Basic Text' body of the request.
	 */
	protected abstract requestBody(): string;

	/**
	 * Handle the data incoming
	 * @param response the AxiosResponse object
	 * @returns The new saved id's of the correspondent IGDB Api endpoint.
	 */
	protected abstract handleResponse(
		response: AxiosResponse
	): string[];

	public async call(): Promise<void> {
		await this.request();
	}

	private async request(): Promise<void> {
		const requestBody = this.requestBody();

		const IGDBInstance = await IGDB.getInstance();

		const IGDBApi = await IGDBInstance.getAPI();

		const response = await IGDBApi.post(
			`/${this.identifier}`,
			requestBody
		);

		this.handleResponse(response);
	}
}

export default IGDBCall;
