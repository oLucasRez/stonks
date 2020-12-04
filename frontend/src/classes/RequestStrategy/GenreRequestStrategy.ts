//----------------------------------------------------------< interfaces >
import IRequestStrategy from '../../interfaces/IRequestStrategy';
import ITagResponse from '../../interfaces/ITagResponse';
//------------------------------------------------------------< services >
import backend from '../../services/backend';
//----------------------------------------------------------------< mock >
import genres from '../../mock/genres.json';
//===============================================================[ CLASS ]
class GenreRequestStrategy implements IRequestStrategy<ITagResponse[]> {
  //-----------------------------------------------------------< methods >
  public async request() {
    const mock: ITagResponse[] = genres;
    return mock;

    const { data } = await backend.get<ITagResponse[]>('genres');

    return data;
  }
}

export default GenreRequestStrategy;
