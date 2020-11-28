//-------------------------------------------------------------< classes >
import FormSingleton from './FormSingleton';
//----------------------------------------------------------< interfaces >
import IUseEffectStrategy from '../interfaces/IUseEffectStrategy';
import ITagResponse from '../interfaces/ITagResponse';
//===============================================================[ CLASS ]
class GenreRequestStrategy implements IUseEffectStrategy {
  //-----------------------------------------------------------< methods >
  public setFormSingleton(tags: ITagResponse[]) {
    const form = FormSingleton.getInstance();
    const genres: number[] = [];

    tags.forEach((tag) => {
      genres.push(tag.id);
    });

    form.inputs.genres = genres.length ? genres : undefined;
  }
}

export default GenreRequestStrategy;
