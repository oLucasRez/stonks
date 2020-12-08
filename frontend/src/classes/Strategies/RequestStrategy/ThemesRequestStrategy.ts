//----------------------------------------------------------< interfaces >
import IRequestStrategy from '../../../interfaces/IRequestStrategy';
import ITagResponse from '../../../interfaces/ITagResponse';
//------------------------------------------------------------< services >
import main_server from '../../../services/main_server';
//----------------------------------------------------------------< mock >
import themes from '../../../mock/themes.json';
//===============================================================[ CLASS ]
class ThemesRequestStrategy implements IRequestStrategy<ITagResponse[]> {
  //-----------------------------------------------------------< methods >
  public async request() {
    const mock: ITagResponse[] = themes;
    return mock;

    const { data } = await main_server.get<ITagResponse[]>('themes');

    return data;
  }
}

export default ThemesRequestStrategy;
