//----------------------------------------------------------< interfaces >
import IRequestStrategy from '../../../interfaces/IRequestStrategy';
import ITagResponse from '../../../interfaces/ITagResponse';
//------------------------------------------------------------< services >
import main_server from '../../../services/main_server';
//===============================================================[ CLASS ]
class ThemesRequestStrategy implements IRequestStrategy<ITagResponse[]> {
  //-----------------------------------------------------------< methods >
  public async request() {
    const { data } = await main_server.get<ITagResponse[]>('themes');

    return data;
  }
}

export default ThemesRequestStrategy;
