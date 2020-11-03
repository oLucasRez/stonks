import express, { Express } from 'express';
import cors from 'cors';

class App {
	public static server: Express;

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
		this.server.use((req, res, next) => {
			res.header('Access-Control-Allow-Origin', '*');
			res.header(
				'Access-Control-Allow-Headers',
				'Origin, X-Requested-With, Content-Type, Accept'
			);
			next();
		});
	}
}

export default App;
