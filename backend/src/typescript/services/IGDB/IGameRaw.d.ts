import { IGame } from '../../database/Tables';

export declare interface IExternalGames {
	id: number;
	category: number;
	uid: string;
}

export declare interface IGameRaw extends IGame {
	external_games?: IExternalGames[];
}
