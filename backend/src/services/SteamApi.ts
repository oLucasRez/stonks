import axios, { AxiosInstance } from 'axios';
import IAppDetails from '../interfaces/Steam/IAppDetails';

class SteamAPI {
  private static instance: AxiosInstance;

  public static getInstance(): AxiosInstance {
    if (!this.instance) {
      this.createAxiosInstance();
    }

    return this.instance;
  }

  public static async getGamePrice(gameId: string) {
    const instance = this.getInstance();

    const { data } = await instance.get('/appdetails', {
      params: { appids: 218620 },
    });

    const { price_overview } = data[gameId].data as IAppDetails;

    return price_overview.final / 100;
  }

  private static createAxiosInstance(): void {
    this.instance = axios.create({
      baseURL: 'https://store.steampowered.com/api/',
    });
  }
}

export default SteamAPI;
