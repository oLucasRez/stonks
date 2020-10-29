import axios, { AxiosInstance } from 'axios';

import Service from '../classes/abstract/Service';

import { IAppDetails } from '../typescript/services/Steam/IAppDetails';

class SteamAPI extends Service<AxiosInstance> {
	private constructor() {
		super();

		this.createAxiosInstance();
	}

	getAPI = (): AxiosInstance => this.api;

	public static getInstance(): SteamAPI {
		if (!SteamAPI.instance) {
			SteamAPI.instance = new SteamAPI();
		}

		return SteamAPI.instance as SteamAPI;
	}

	public async getGamePrice(gameId: string): Promise<number> {
		const gameIdNumber = Number.parseInt(gameId, 10);

		const { data, status } = await this.api.get('/appdetails', {
			params: { appids: gameIdNumber },
		});

		// console.log();

		// console.log(status);

		if (status !== 200 || !data[gameId].success) {
			// console.log(
			// 	'Ihhh deu ruim, hein? A steam te bloqueou ai, esperando 4 segundos'
			// );
			return -1;
		}

		// console.log(gameId);

		const {
			price_overview,
			is_free,
			name,
			package_groups,
		} = data[gameId].data as IAppDetails;

		// console.log(`Name: ${name}`);

		if (is_free) {
			// console.log('free game');
			return 0;
		}

		if (price_overview === undefined) {
			if (package_groups.length === 0) return -1;
			const minPrice = package_groups[0].subs.filter(
				(x) => x.price_in_cents_with_discount
			)[0].price_in_cents_with_discount;
			// console.log(`Packet R$ ${minPrice / 100}`);
			return minPrice / 100;
		}

		// console.log(`price ${price_overview.final / 100}`);
		return price_overview.final / 100;
	}

	private createAxiosInstance(): void {
		this.api = axios.create({
			baseURL: 'https://store.steampowered.com/api/',
		});
	}
}

export default SteamAPI;
