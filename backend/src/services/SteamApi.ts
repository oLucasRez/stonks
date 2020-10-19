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

		return SteamAPI.instance;
	}

	public async getGamePrice(gameId: string) {
		const { data } = await this.api.get('/appdetails', {
			params: { appids: 218620 },
		});

		const { price_overview } = data[gameId].data as IAppDetails;

		return price_overview.final / 100;
	}

	private createAxiosInstance(): void {
		this.api = axios.create({
			baseURL: 'https://store.steampowered.com/api/',
		});
	}
}

export default SteamAPI;
