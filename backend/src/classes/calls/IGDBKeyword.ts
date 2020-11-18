import { AxiosError, AxiosResponse } from 'axios';

import { IIGDBRequestBody } from '../../typescript/services/IGDB/RequestBody';

import IGDBCall from '../abstract/IGDBCall';

import { IKeyword } from '../../typescript/database/Tables';

export default class IGDBKeyword extends IGDBCall<IKeyword[]> {
	public idLowerLimit: number;

	public idHigherLimit: number;

	protected idStep: number;

	protected onlySteam: boolean;

	protected identifier: string;

	constructor() {
		super();

		this.identifier = 'keywords';

		this.idLowerLimit = 0;
		this.idHigherLimit = 499;

		this.onlySteam = false;

		this.idStep = this.idHigherLimit - this.idLowerLimit + 1;
	}

	protected requestBody(): IIGDBRequestBody {
		return {
			fields: ['name'],
			limit: 500,
		};
	}

	protected async handleResponse(
		response: AxiosResponse<IKeyword[]>
	): Promise<IKeyword[]> {
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
