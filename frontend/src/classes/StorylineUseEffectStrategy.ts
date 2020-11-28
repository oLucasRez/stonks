//-------------------------------------------------------------< classes >
import FormSingleton from './FormSingleton';
//----------------------------------------------------------< interfaces >
import IUseEffectStrategy from '../interfaces/IUseEffectStrategy';
//===============================================================[ CLASS ]
class StorylineUseEffectStrategy implements IUseEffectStrategy {
  //-----------------------------------------------------------< methods >
  public setFormSingleton(text: string) {
    const form = FormSingleton.getInstance();

    form.inputs.storyline = text.length ? text : undefined;
  }
}

export default StorylineUseEffectStrategy;
