import { AxiosError, AxiosResponse } from 'axios';

import { IIGDBRequestBody } from '../typescript/services/IGDB/RequestBody';

import IGDBCall from './abstract/IGDBCall';

export default class IGDBCallTest extends IGDBCall {
	idLowerLimit: number;

	idHigherLimit: number;

	idStep: number;

	constructor(identifier: string) {
		super(identifier);

		this.idLowerLimit = 0;
		this.idHigherLimit = 500;

		this.idStep = this.idHigherLimit - this.idLowerLimit;
	}

	protected requestBody(): IIGDBRequestBody {
		return {
			fields: ['name', 'slug'],
			limit: 500,
		};
	}

	protected handleResponse(
		response: AxiosResponse<any>
	): string[] {
		const { data } = response;

		const ids = data.map((game: any) => {
			console.log(`[IGDB]: Game Fetched: ${game.name}`);

			return game.id;
		});

		console.log('\n');

		return ids;
	}

	protected handleRequestException(
		_error: AxiosError,
		_body: IIGDBRequestBody,
		bodyString: string,
		identifier: string
	): void {
		console.log(
			`[IGDB]: Error ocurred on request on endpoint "${identifier}" with body: ${bodyString}`
		);
	}
}
