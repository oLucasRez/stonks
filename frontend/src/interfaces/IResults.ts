//===========================================================[ INTERFACE ]
interface IResults {
  genres?: string[];
  themes?: string[];
  timeToBeat?: number;
  playerPerspectives?: string[];
  gameModes?: string[];
  ageRating?: number;
  price?: string;
  releaseDate?: number;
  predict: {
    accuracy: {
      follows: number;
      rating: number;
    };
    follows: number;
    rating: number;
  };
}

export default IResults;
