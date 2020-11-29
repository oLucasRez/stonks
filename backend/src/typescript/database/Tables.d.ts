export declare interface IGame {
	id?: number;
	id_game_engine?: number;
	age_rating?: number;
	time_to_beat?: number;
	follows?: number;
	hype?: number;
	total_rating?: number;
	total_rating_count?: number;
	price?: number;
	name?: string;
	slug?: string;
	first_release_date?: Date;
	is_user?: boolean;
}

export declare interface IGenre {
	id: number;
	name: string;
	slug: string;
}

export declare interface IKeyword {
	id: number;
	name: string;
}

export declare interface IPlayerPerspective {
	id: number;
	name: string;
	slug: string;
}

export declare interface ITheme {
	id: number;
	name: string;
	slug: string;
}

export declare interface IGameEngine {
	id: number;
	name: string;
}

export declare interface IGameMode {
	id: number;
	name: string;
	slug: string;
}

export declare interface ISummary {
	id: number;
	token: number;
}

export declare interface IStoryline {
	id: number;
	token: number;
}

export declare interface IToken {
	id: number;
	token: string;
	type: string;
}
