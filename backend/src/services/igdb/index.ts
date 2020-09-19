import axios, { AxiosInstance } from 'axios';

class IGDBApi {
  private static instance: AxiosInstance;

  private constructor() {}

  public static getInstance(): AxiosInstance {
    if (!IGDBApi.instance) {
      IGDBApi.createAxiosInstance();
    }

    return IGDBApi.instance;
  }

  private static createAxiosInstance(): void {
    IGDBApi.instance = axios.create({
      baseURL: 'https://api-v3.igdb.com',
      headers: {
        content_type: 'raw',
        'user-key': process.env.IGDB_KEY,
      },
    });
  }
}

export default IGDBApi;
