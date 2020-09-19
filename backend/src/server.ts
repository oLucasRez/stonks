import express, { Express } from 'express';
import cors from 'cors';

class App {
  public static server: Express;

  private constructor() {}

  public static getInstance(): Express {
    if (!App.server) {
      App.createServerInstance();
    }

    return App.server;
  }

  private static createServerInstance(): void {
    App.server = express();

    App.configureServer();
  }

  private static configureServer(): void {
    App.server.use(express.json());
    App.server.use(cors());
  }
}

export default App;
