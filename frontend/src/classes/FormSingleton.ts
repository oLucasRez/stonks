//----------------------------------------------------------< interfaces >
import IInputs from '../interfaces/IInputs';
//------------------------------------------------------------< services >
import backend from '../services/backend';
//===============================================================[ CLASS ]
class FormSingleton {
  //--------------------------------------------------------< properties >
  private static instance: FormSingleton;
  //----------------------------------------------------------------------
  public inputs: IInputs = {};
  //----------------------------------------------------------------------
  public response: IInputs = {};
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
    const { data } = await backend.post('player-input', this.inputs);
    console.log(data);
  }
}

export default FormSingleton;
