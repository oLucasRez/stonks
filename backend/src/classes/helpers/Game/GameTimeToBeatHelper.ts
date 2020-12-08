import CSVReader from '../../../services/CSVReader';

import { ITimeToBeat } from '../../../typescript/services/CSVReader/ITimeToBeat';
import { IGameRaw } from '../../../typescript/services/IGDB/IGameRaw';

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

	public async fillTimeToBeats(
		data: IGameRaw
	): Promise<IGameRaw> {
		if (!this.time_to_beat) {
			await this.createTimeToBeatMap();
		}

		const filledGame = data;

		const game_id = data.id?.toString();

		if (game_id && this.time_to_beat.has(game_id)) {
			const time_to_beat = this.time_to_beat.get(
				game_id
			) as string;

			filledGame.time_to_beat = parseInt(time_to_beat, 10);
		}

		return filledGame;
	}
}

export default GameTimeToBeatHelper;
