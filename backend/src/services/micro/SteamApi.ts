import axios, { AxiosInstance } from 'axios';

import ISteamPriceResponse from '../../typescript/services/Steam/ISteamPriceResponse';

const { STEAM_SERVICE_URL_DEV } = process.env;

class SteamAPI {
	private static serviceAPI: AxiosInstance;

	private static handlePriceOverview(
		priceResponse: ISteamPriceResponse
	): number {
		const { package_groups } = priceResponse;

		if (!package_groups || package_groups?.length === 0) {
			// No pricing available
			return -1;
		}

		const { subs } = package_groups[0];

		const subPrices = subs.sort(
			(sub) => sub.price_in_cents_with_discount
		);

		const minPrice = subPrices[0].price_in_cents_with_discount;

		return minPrice / 100;
	}

	public static async getGamePrices(
		appids: number[]
	): Promise<number[]> {
		if (!this.serviceAPI) {
			this.serviceAPI = this.createAxiosInstance();
		}

		const { data, status } = await this.serviceAPI.post('/', {
			appids,
		});

		const priceResponse = data as ISteamPriceResponse[];

		const result = priceResponse.map((price) => {
			if (status !== 200 || price.success) {
				// Game doesn't exist or steam has blocked access
				return -1;
			}

			if (price.is_free) {
				return 0;
			}

			if (!price.price_overview) {
				return this.handlePriceOverview(price);
			}

			return price.price_overview.final / 100;
		});

		return result;
	}

	private static createAxiosInstance(): AxiosInstance {
		return axios.create({
			baseURL: STEAM_SERVICE_URL_DEV,
		});
	}
}

export default SteamAPI;
