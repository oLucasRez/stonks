import CSVReader from '../services/CSVReader';

import { ITimeToBeat } from '../typescript/services/CSVReader/ITimeToBeat';

test('CSVReader.read<ITimeToBeat> should return a defined object', async () => {
	const timeToBeat = await CSVReader.readCSV<ITimeToBeat>(
		'time_to_beats'
	);

	expect(timeToBeat).toBeDefined();
});
