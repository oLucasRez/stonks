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

		console.log(status);

		if (status !== 200 || !data[gameId].success) {
			console.log(
				'Ihhh deu ruim, hein? A steam te bloqueou ai, esperando 4 segundos'
			);
			return -1;
		}

		const { price_overview } = data[gameId].data as IAppDetails;

		console.log(`Found: ${price_overview.final}`);

		return price_overview.final / 100;
	}

	private createAxiosInstance(): void {
		this.api = axios.create({
			baseURL: 'https://store.steampowered.com/api/',
		});
	}
}

export default SteamAPI;
