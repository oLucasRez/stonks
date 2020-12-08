//-------------------------------------------------------------< classes >
import FormSingleton from '../../FormSingleton';
//----------------------------------------------------------< interfaces >
import IUseEffectStrategy from '../../../interfaces/IUseEffectStrategy';
import ITagResponse from '../../../interfaces/ITagResponse';
//===============================================================[ CLASS ]
class ThemeRequestStrategy implements IUseEffectStrategy {
  //-----------------------------------------------------------< methods >
  public setFormSingleton(tags: ITagResponse[]) {
    const form = FormSingleton.getInstance();
    const themes: string[] = [];

    tags.forEach((tag) => {
      themes.push(tag.name);
    });

    form.inputs.themes = themes.length ? themes : null;
  }
}

export default ThemeRequestStrategy;
