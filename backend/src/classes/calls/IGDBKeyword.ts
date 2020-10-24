import { AxiosError, AxiosResponse } from 'axios';

import { IIGDBRequestBody } from '../../typescript/services/IGDB/RequestBody';

import IGDBCall from '../abstract/IGDBCall';

import { IKeyword } from '../../typescript/database/Tables';

export default class IGDBKeyword extends IGDBCall {
	idLowerLimit: number;

	idHigherLimit: number;

	idStep: number;

	onlySteam: boolean;

	identifier: string;

	constructor() {
		super();

		this.identifier = 'keywords';

		this.idLowerLimit = 0;
		this.idHigherLimit = 200;

		this.onlySteam = false;

		this.idStep = this.idHigherLimit - this.idLowerLimit + 1;
	}

	protected requestBody(): IIGDBRequestBody {
		return {
			fields: ['name'],
			limit: 500,
		};
	}

	protected handleResponse(
		response: AxiosResponse<IKeyword[]>
	): string[] {
		const { data } = response;

		const ids = data.map((keyword: IKeyword) => {
			return keyword.id.toString();
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
