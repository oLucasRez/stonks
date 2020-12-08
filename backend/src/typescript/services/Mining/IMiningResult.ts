export interface ITreeResult {
	engine_names?: string[];
	release_dates?: string[];
	price?: string;
	predict?: string;
}

export interface IMiningResult {
	hype?: ITreeResult;

	follows?: ITreeResult;

	total_rating?: ITreeResult;
}
