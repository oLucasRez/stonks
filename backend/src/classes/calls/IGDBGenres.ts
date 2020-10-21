import { AxiosError, AxiosResponse } from 'axios';

import { IIGDBRequestBody } from '../../typescript/services/IGDB/RequestBody';

import IGDBCall from '../abstract/IGDBCall';

import { IGenre } from '../../typescript/DB/Tables';

export default class IGDBGenres extends IGDBCall {
	idLowerLimit: number;

	idHigherLimit: number;

	idStep: number;

	onlySteam: boolean;

	identifier: string;

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

	protected handleResponse(
		response: AxiosResponse<IGenre[]>
	): string[] {
		const { data } = response;

		const ids = data.map((genre: IGenre) => {
			return genre.id.toString();
		});

		console.log(data[1]);

		// TODO Add to database

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
