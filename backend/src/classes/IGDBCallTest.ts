import { AxiosResponse } from 'axios';
import IGDBCall from './abstract/IGDBCall';

export default class IGDBCallTest extends IGDBCall {
	// eslint-disable-next-line class-methods-use-this
	protected requestBody(): string {
		return 'fields *; limit 500;';
	}

	// eslint-disable-next-line class-methods-use-this
	protected handleResponse(
		response: AxiosResponse<any>
	): string[] {
		const { data } = response;

		const ids = data.map((game: any) => {
			return game.id;
		});

		console.log('\n');

		return ids;
	}
}
