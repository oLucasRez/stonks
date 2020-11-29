export default interface IUserInput {
	genres?: number[];
	themes?: number[];
	keywords?: number[];
	storyline?: string;
	summary?: string;
	player_perspectives?: number[];
	time_to_beat?: number;
	game_engine?: number;
	age_rating?: number;
	price?: number;
	release_date?: {
		month: number;
		day: number;
	};
}
