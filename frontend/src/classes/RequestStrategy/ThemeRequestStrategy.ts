//----------------------------------------------------------< interfaces >
import IRequestStrategy from '../../interfaces/IRequestStrategy';
import ITagResponse from '../../interfaces/ITagResponse';
//------------------------------------------------------------< services >
import backend from '../../services/backend';
//----------------------------------------------------------------< mock >
import themes from '../../mock/themes.json';
//===============================================================[ CLASS ]
class ThemeRequestStrategy implements IRequestStrategy<ITagResponse[]> {
  //-----------------------------------------------------------< methods >
  public async request() {
    const mock: ITagResponse[] = themes;
    return mock;

    const { data } = await backend.get<ITagResponse[]>('themes');

    return data;
  }
}

export default ThemeRequestStrategy;
