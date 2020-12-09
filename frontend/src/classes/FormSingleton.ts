//----------------------------------------------------------< interfaces >
import IInputs from '../interfaces/IInputs';
import IResults from '../interfaces/IResults';
//------------------------------------------------------------< services >
import result_example from '../mock/result.json';
import main_server from '../services/main_server';
//===============================================================[ CLASS ]
class FormSingleton {
  //--------------------------------------------------------< properties >
  private static instance: FormSingleton;
  //----------------------------------------------------------------------
  public inputs: IInputs = {
    genres: null,
    themes: null,
    game_modes: null,
    player_perspectives: null,
    time_to_beat: null,
    age_rating: null,
    price: null,
    release_date: null,
  };
  public result: IResults | undefined;
  //-----------------------------------------------------------< methods >
  private constructor() {}
  //----------------------------------------------------------------------
  public static getInstance(): FormSingleton {
    if (!FormSingleton.instance) FormSingleton.instance = new FormSingleton();

    return FormSingleton.instance;
  }
  //----------------------------------------------------------------------
  public print() {
    console.log(this.inputs);
  }
  //----------------------------------------------------------------------
  public async submit() {
    const { data } = await main_server.post('mining', this.inputs);
    // const data: IResultResponse = result_example;
    const result: IResults = {
      genres: this.inputs.genres ? undefined : data.suggestions.genres,
      themes: this.inputs.themes ? undefined : data.suggestions.themes,
      timeToBeat: this.inputs.time_to_beat
        ? undefined
        : data.suggestions.time_to_beat,
      playerPerspectives: this.inputs.player_perspectives
        ? undefined
        : data.suggestions.player_perspectives,
      gameModes: this.inputs.game_modes
        ? undefined
        : data.suggestions.game_modes,
      ageRating: this.inputs.age_rating
        ? undefined
        : data.suggestions.age_rating,
      price:
        this.inputs.price !== null
          ? undefined
          : data.suggestions.price.toFixed(2),
      releaseDate: this.inputs.release_date
        ? undefined
        : data.suggestions.release_date,
      predict: data.user_prediction,
    };
    console.log(this.inputs);
    console.log(result);
    this.result = result;
  }
}

export default FormSingleton;
