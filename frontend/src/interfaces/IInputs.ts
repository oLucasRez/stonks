//===========================================================[ INTERFACE ]
interface IInputs {
  genres: string[] | null;
  themes: string[] | null;
  game_modes: string[] | null;
  player_perspectives: string[] | null;
  time_to_beat: string | null;
  age_rating: number | null;
  price: string | null;
  release_date: number | null;
}

export default IInputs;
