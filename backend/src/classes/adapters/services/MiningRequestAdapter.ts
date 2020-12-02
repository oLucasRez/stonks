import { readFile, existsSync } from 'fs';
import { exec } from 'child_process';
import { resolve as path_resolve } from 'path';

import {
	IMiningResult,
	ITreeResult,
} from '../../../typescript/services/Mining/IMiningResult';

const scriptPath = path_resolve(
	__dirname,
	'..',
	'..',
	'..',
	'services',
	'mining',
	'mining.R'
);

class MiningAdapter {
	private static getReadFilePromise(path: string) {
		return new Promise<any>((resolve, reject) => {
			readFile(path, { encoding: 'utf8' }, (error, data) => {
				if (error) {
					reject(error);
				}

				resolve(JSON.parse(data));
			});
		});
	}

	private static async runMiningAndGetReturnPath(
		id: number
	): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			exec(`Rscript ${scriptPath} ${id}`, (error, stdout, _) => {
				if (error) {
					reject(error);
				}

				const path = stdout.split('[1] ');

				const finalPath = path[path.length - 1].replace(
					/(\"|\r?\n)/g,
					''
				);

				resolve(finalPath as string);
			});
		});
	}

	private static findCorrectValues(obj: any): ITreeResult {
		const objKeys = Object.keys(obj);

		const firstReleaseDate = objKeys.find((value) =>
			value.startsWith('first_release_date')
		);

		const engineName = objKeys.find((value) =>
			value.startsWith('engine_name')
		);

		const foundPrice = objKeys.find((value) =>
			value.startsWith('price')
		);

		const foundPredict = objKeys.find((value) =>
			value.startsWith('predict')
		);

		const first_release_date = (
			firstReleaseDate && obj[firstReleaseDate].replace(/ /g, '')
		).split(',');

		const engine_name = (
			engineName && obj[engineName].replace(/ /g, '')
		).split(',');

		const price = foundPrice && obj[foundPrice];

		const predict = foundPredict && obj[foundPredict];

		return {
			release_dates: first_release_date,
			engine_names: engine_name,
			price,
			predict,
		};
	}

	private static async getMiningObject(
		path: string
	): Promise<IMiningResult> {
		const miningObject = await MiningAdapter.getReadFilePromise(
			path
		);

		const miningResult: IMiningResult = {};

		const [hype, follows, total_rating] = miningObject;

		miningResult.hype = MiningAdapter.findCorrectValues(hype);
		miningResult.follows = MiningAdapter.findCorrectValues(
			follows
		);
		miningResult.total_rating = MiningAdapter.findCorrectValues(
			total_rating
		);

		return miningResult;
	}

	static async runMining(id: number): Promise<IMiningResult> {
		const path = await MiningAdapter.runMiningAndGetReturnPath(
			id
		);

		return MiningAdapter.getMiningObject(path);
	}
}

export default MiningAdapter;
