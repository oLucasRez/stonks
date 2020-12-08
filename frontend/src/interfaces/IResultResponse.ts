//===========================================================[ INTERFACE ]
interface IResultResponse {
  suggestions: {
    age_rating: number;
    game_modes: string[];
    genres: string[];
    player_perspectives: string[];
    price: number;
    release_date: number;
    themes: string[];
    time_to_beat: number;
  };
  user_prediction: {
    accuracy: {
      follows: number;
      rating: number;
    };
    follows: number;
    rating: number;
  };
}

export default IResultResponse;
