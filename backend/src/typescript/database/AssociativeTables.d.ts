export declare interface IGameGenre {
	id?: number;
	id_genre: number;
	id_game: number;
}

export declare interface IGameKeyword {
	id?: number;
	id_keyword: number;
	id_game: number;
}

export declare interface IGameGameMode {
	id?: number;
	id_game_mode: number;
	id_game: number;
}

export declare interface IGamePlayerPerspective {
	id?: number;
	id_player_perspective: number;
	id_game: number;
}

export declare interface IGameTheme {
	id?: number;
	id_theme: number;
	id_game: number;
}

export declare interface IGameToken {
	id?: number;
	id_game: number;
	id_token: number;
	weight: number;
	type: string;
}
