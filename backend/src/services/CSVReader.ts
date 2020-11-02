import fs from 'fs';
import csv from 'csv-parser';
import { resolve as pathResolve } from 'path';

class CSVReader {
	/**
	 * Reads a csv and return it's content on JSON format specified by the type provided.
	 * @type The output type that matches the content on the csv.
	 * @param name The name on the file to be read, needs to be on assets/sheets/ directory.
	 */
	public static async readCSV<T>(name: string): Promise<T[]> {
		const path = pathResolve(
			__dirname,
			'..',
			'assets',
			'sheets',
			`${name}.csv`
		);

		return new Promise((resolve, reject) => {
			const results: T[] = [];

			fs.createReadStream(path)
				.pipe(csv())
				.on('data', (data) => results.push(data))
				.on('end', () => {
					resolve(results);
				})
				.on('error', reject);
		});
	}
}

export default CSVReader;
