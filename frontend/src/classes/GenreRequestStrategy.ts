//----------------------------------------------------------< interfaces >
import IRequestStrategy from '../interfaces/IRequestStrategy';
import ITagResponse from '../interfaces/ITagResponse';
//------------------------------------------------------------< services >
import backend from '../services/backend';
//===============================================================[ CLASS ]
class GenreRequestStrategy implements IRequestStrategy<ITagResponse[]> {
  //-----------------------------------------------------------< methods >
  public async request() {
    try {
      const { data } = await backend.get<ITagResponse[]>('genres');
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default GenreRequestStrategy;
