//===========================================================[ INTERFACE ]
interface ISubResult {
  genres?: string[];
  themes?: string[];
  keywords?: string[];
  engine_names?: string[];
  time_to_beat?: string;
  player_perspectives?: string[];
  game_modes?: string[];
  age_ratings?: string[];
  price?: string;
  release_dates?: string[];
  predict: string;
}

interface IResults {
  hype: ISubResult;
  follows: ISubResult;
  total_rating: ISubResult;
}

export default IResults;
