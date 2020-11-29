//-------------------------------------------------------------< classes >
import FormSingleton from '../FormSingleton';
//----------------------------------------------------------< interfaces >
import IUseEffectStrategy from '../../interfaces/IUseEffectStrategy';
import ITagResponse from '../../interfaces/ITagResponse';
//===============================================================[ CLASS ]
class ThemeRequestStrategy implements IUseEffectStrategy {
  //-----------------------------------------------------------< methods >
  public setFormSingleton(tags: ITagResponse[]) {
    const form = FormSingleton.getInstance();
    const themes: number[] = [];

    tags.forEach((tag) => {
      themes.push(tag.id);
    });

    form.inputs.themes = themes.length ? themes : undefined;
  }
}

export default ThemeRequestStrategy;
