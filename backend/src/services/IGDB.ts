import axios, { AxiosInstance } from 'axios';

import ABService from '../classes/abstract/Service';

class IGDBApi extends ABService<AxiosInstance> {
	private expirationTime!: Date;

	private constructor() {
		super();

		this.createAxiosInstance();
	}

	public async getAPI(): Promise<AxiosInstance> {
		const currentExpiration = this.expirationTime?.getTime();

		if (currentExpiration < Date.now() || !currentExpiration) {
			await this.updateBearerToken();
		}

		return this.api;
	}

	public static async getInstance(): Promise<IGDBApi> {
		if (!IGDBApi.instance) {
			IGDBApi.instance = new IGDBApi();
		}

		return IGDBApi.instance as IGDBApi;
	}

	private async updateBearerToken(): Promise<void> {
		const { data } = await axios.post(
			'https://id.twitch.tv/oauth2/token',
			null,
			{
				params: {
					client_id: process.env.TWITCH_CLIENT_ID,
					client_secret: process.env.TWITCH_CLIENT_SECRET,
					grant_type: 'client_credentials',
				},
			}
		);

		const { access_token, expires_in } = data;

		const { headers } = this.api.defaults;

		this.api.defaults.headers = {
			...headers,
			Authorization: `Bearer ${access_token}`,
		};

		const expiration_time = new Date(Date.now());

		expiration_time.setSeconds(
			expiration_time.getSeconds() + expires_in
		);

		// eslint-disable-next-line no-console
		console.log(
			`[SERVER]: Refreshed token => expires at ${expiration_time}`
		);

		this.expirationTime = expiration_time;

		setTimeout(this.updateBearerToken, expires_in);
	}

	private createAxiosInstance(): void {
		this.api = axios.create({
			baseURL: 'https://api.igdb.com/v4/',
			headers: {
				'Content-Type': 'raw',
				'Client-ID': process.env.TWITCH_CLIENT_ID,
			},
		});
	}
}

export default IGDBApi;
