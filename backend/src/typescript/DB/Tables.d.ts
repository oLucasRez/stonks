export declare interface IGameMode {
	id: number;
	id_game_engine: number;
	age_rating: number;
	time_to_beat: number;
	follows: number;
	hype: number;
	total_rating: number;
	total_rating_count: number;
	price: number;
	name: string;
	slug: string;
	storyline: string;
	summary: string;
	release_date: Date;
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
