import axios, { AxiosInstance } from 'axios';

class IGDBApi {
  private static instance: AxiosInstance;

  private constructor() {}

  public static async getInstance(): Promise<AxiosInstance> {
    if (!this.instance) {
      this.createAxiosInstance();
      await this.updateBearerToken();
    }

    return this.instance;
  }

  private static async updateBearerToken(): Promise<void> {
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

    const { access_token } = data;

    const { headers } = this.instance.defaults;

    this.instance.defaults.headers = {
      ...headers,
      Authorization: `Bearer ${access_token}`,
    };

    console.log(`[SERVER]: Refreshed token: ${access_token}`);

    setTimeout(this.updateBearerToken, 3600000);
  }

  private static createAxiosInstance(): void {
    this.instance = axios.create({
      baseURL: 'https://api.igdb.com/v4/',
      headers: {
        'Content-Type': 'raw',
        'Client-ID': process.env.TWITCH_CLIENT_ID,
      },
    });
  }
}

export default IGDBApi;
