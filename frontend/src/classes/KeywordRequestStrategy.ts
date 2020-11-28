//----------------------------------------------------------< interfaces >
import IRequestStrategy from '../interfaces/IRequestStrategy';
import ITagResponse from '../interfaces/ITagResponse';
//------------------------------------------------------------< services >
import backend from '../services/backend';
//===============================================================[ CLASS ]
class KeywordRequestStrategy implements IRequestStrategy<ITagResponse[]> {
  //-----------------------------------------------------------< methods >
  public async request(startString: string) {
    const { data } = await backend.get<ITagResponse[]>('keywords', {
      params: { startString },
    });
    return data;
  }
}

export default KeywordRequestStrategy;
