import { IGame } from '../../database/Tables';

export declare interface IExternalGames {
	id: number;
	category: number;
	uid: string;
}

export declare interface IGameRaw extends IGame {
	external_games?: IExternalGames[];
	summary?: string;
	storyline?: string;
	summaryTokens?: ITokenRaw[];
	storylineTokens?: ITokenRaw[];
	game_modes: number[];
	genres: number[];
	keywords: number[];
	player_perspectives: number[];
	themes: number[];
	game_engines?: number[];
	age_ratings?: number[];
	hypes?: number;
	first_release_date: number;
}
