//----------------------------------------------------------< interfaces >
import IInputs from '../interfaces/IInputs';
import IResults from '../interfaces/IResults';
//-------------------------------------------------------------< classes >
import ResultManager from './ResultManager';
//------------------------------------------------------------< services >
import backend from '../services/backend';
import result_example from '../mock/result.json';
//===============================================================[ CLASS ]
class FormSingleton {
  //--------------------------------------------------------< properties >
  private static instance: FormSingleton;
  //----------------------------------------------------------------------
  public inputs: IInputs = {};
  public result: ResultManager | undefined;
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
    // const { data } = await backend.post('player-input', this.inputs);
    this.result = new ResultManager(result_example);
  }
}

export default FormSingleton;
