//-------------------------------------------------------------< classes >
import FormSingleton from './FormSingleton';
//----------------------------------------------------------< interfaces >
import IUseEffectStrategy from '../interfaces/IUseEffectStrategy';
import ITagResponse from '../interfaces/ITagResponse';
//===============================================================[ CLASS ]
class KeywordRequestStrategy implements IUseEffectStrategy {
  //-----------------------------------------------------------< methods >
  public setFormSingleton(tags: ITagResponse[]) {
    const form = FormSingleton.getInstance();
    const keywords: number[] = [];

    tags.forEach((tag) => {
      keywords.push(tag.id);
    });

    form.inputs.keywords = keywords.length ? keywords : undefined;
  }
}

export default KeywordRequestStrategy;
