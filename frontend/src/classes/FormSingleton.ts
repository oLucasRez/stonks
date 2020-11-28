//----------------------------------------------------------< interfaces >
import IInputs from '../interfaces/IInputs';
//===============================================================[ CLASS ]
class FormSingleton {
  //--------------------------------------------------------< properties >
  private static instance: FormSingleton;
  //----------------------------------------------------------------------
  public inputs: IInputs = {};
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
}

export default FormSingleton;
