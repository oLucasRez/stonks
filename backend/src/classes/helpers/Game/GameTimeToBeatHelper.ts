import CSVReader from '../../../services/CSVReader';

import { IGame } from '../../../typescript/database/Tables';
import { ITimeToBeat } from '../../../typescript/services/CSVReader/ITimeToBeat';

class GameTimeToBeatHelper {
	private static instance: GameTimeToBeatHelper;

	private time_to_beat!: Map<string, string>;

	public static getInstance(): GameTimeToBeatHelper {
		if (!this.instance) {
			this.instance = new GameTimeToBeatHelper();
		}

		return this.instance;
	}

	private async createTimeToBeatMap(): Promise<void> {
		this.time_to_beat = new Map<string, string>();

		const result = await CSVReader.readCSV<ITimeToBeat>(
			'time_to_beats'
		);

		result.map(({ id_game, time_to_beat }) =>
			this.time_to_beat.set(id_game.toString(), time_to_beat)
		);
	}

	public async fillTimeToBeats(data: IGame[]): Promise<IGame[]> {
		const newData = data;

		if (!this.time_to_beat) {
			await this.createTimeToBeatMap();
		}

		for (let i = 0; i < newData.length; i += 1) {
			const game_id = newData[i].id.toString();

			if (this.time_to_beat.has(game_id)) {
				const time_to_beat = this.time_to_beat.get(
					game_id
				) as string;

				newData[i].time_to_beat = parseInt(time_to_beat, 10);
			}
		}

		return newData;
	}
}

export default GameTimeToBeatHelper;
