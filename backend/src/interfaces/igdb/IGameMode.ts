interface IGameMode {
  id: number;
  name: string;
  slug: string;
}

interface IGameModeGame {
  id: number;
  id_game: number;
  id_game_mode: number;
}