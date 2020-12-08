//-------------------------------------------------------------< classes >
import FormSingleton from '../../FormSingleton';
//----------------------------------------------------------< interfaces >
import IUseEffectStrategy from '../../../interfaces/IUseEffectStrategy';
import ITagResponse from '../../../interfaces/ITagResponse';
//===============================================================[ CLASS ]
class GenresRequestStrategy implements IUseEffectStrategy {
  //-----------------------------------------------------------< methods >
  public setFormSingleton(tags: ITagResponse[]) {
    const form = FormSingleton.getInstance();
    const genres: string[] = [];

    tags.forEach((tag) => {
      genres.push(tag.name);
    });

    form.inputs.genres = genres.length ? genres : null;
  }
}

export default GenresRequestStrategy;
