//===========================================================[ INTERFACE ]
interface IInputs {
  genres: string[] | null;
  themes: string[] | null;
  game_modes: string[] | null;
  player_perspectives: string[] | null;
  time_to_beat: number | null;
  age_rating: number | null;
  price: number | null;
  release_date: number | null;
}

export default IInputs;
