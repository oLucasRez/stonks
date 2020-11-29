//-------------------------------------------------------------< classes >
import FormSingleton from '../FormSingleton';
//----------------------------------------------------------< interfaces >
import IUseEffectStrategy from '../../interfaces/IUseEffectStrategy';
//===============================================================[ CLASS ]
class SummaryUseEffectStrategy implements IUseEffectStrategy {
  //-----------------------------------------------------------< methods >
  public setFormSingleton(text: string) {
    const form = FormSingleton.getInstance();

    form.inputs.summary = text.length ? text : undefined;
  }
}

export default SummaryUseEffectStrategy;
