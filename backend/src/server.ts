import express, { Express } from 'express';
import cors from 'cors';

class App {
  public static server: Express;

  private constructor() {}

  public static async getInstance(): Promise<Express> {
    if (!this.server) {
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
