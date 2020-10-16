import axios, { AxiosInstance } from 'axios';

class IGDBApi {
  private static instance: AxiosInstance;

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

    const { access_token, expires_in } = data;

    const { headers } = this.instance.defaults;

    this.instance.defaults.headers = {
      ...headers,
      Authorization: `Bearer ${access_token}`,
    };

    var expiration_time = new Date(Date.now());
    expiration_time.setSeconds(expiration_time.getSeconds() + expires_in);

    console.log(`[SERVER]: Refreshed token => expires at ${expiration_time}`);

    setTimeout(this.updateBearerToken, expires_in);
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
