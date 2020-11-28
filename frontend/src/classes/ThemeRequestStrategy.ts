//----------------------------------------------------------< interfaces >
import IRequestStrategy from '../interfaces/IRequestStrategy';
import ITagResponse from '../interfaces/ITagResponse';
//------------------------------------------------------------< services >
import backend from '../services/backend';
//===============================================================[ CLASS ]
class ThemeRequestStrategy implements IRequestStrategy<ITagResponse[]> {
  //-----------------------------------------------------------< methods >
  public async request() {
    const { data } = await backend.get<ITagResponse[]>('themes');
    return data;
  }
}

export default ThemeRequestStrategy;
