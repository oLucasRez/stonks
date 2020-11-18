import { AxiosError, AxiosResponse } from 'axios';

import { IIGDBRequestBody } from '../../typescript/services/IGDB/RequestBody';

import IGDBCall from '../abstract/IGDBCall';

import { IGenre } from '../../typescript/database/Tables';

export default class IGDBGenres extends IGDBCall<IGenre[]> {
	public idLowerLimit: number;

	public idHigherLimit: number;

	protected idStep: number;

	protected onlySteam: boolean;

	protected identifier: string;

	constructor() {
		super();

		this.identifier = 'genres';

		this.idLowerLimit = 0;
		this.idHigherLimit = 200;

		this.onlySteam = false;

		this.idStep = this.idHigherLimit - this.idLowerLimit + 1;
	}

	protected requestBody(): IIGDBRequestBody {
		return {
			fields: ['name', 'slug'],
			limit: 500,
		};
	}

	protected async handleResponse(
		response: AxiosResponse<IGenre[]>
	): Promise<IGenre[]> {
		const { data } = response;

		return data;
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
