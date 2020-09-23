import express, { Express } from 'express';
import { AxiosInstance } from 'axios';
import cors from 'cors';

import IGDBApi from './services/igdb';

class App {
  public static server: Express;
  public static IGDBApi: AxiosInstance;

  private constructor() {}

  public static async getInstance(): Promise<Express> {
    if (!this.server) {
      this.IGDBApi = await IGDBApi.getInstance();
      this.createServerInstance();
    }

    return this.server;
  }

  private static createServerInstance(): void {
    this.server = express();

    this.configureServer();
  }

  private static configureServer(): void {
    this.server.use(express.json());
    this.server.use(cors());
  }
}

export default App;
