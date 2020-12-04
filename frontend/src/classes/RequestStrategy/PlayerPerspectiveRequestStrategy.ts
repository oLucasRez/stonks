//----------------------------------------------------------< interfaces >
import IRequestStrategy from '../../interfaces/IRequestStrategy';
import ICheckResponse from '../../interfaces/ICheckResponse';
//------------------------------------------------------------< services >
import backend from '../../services/backend';
//----------------------------------------------------------------< mock >
import player_perspectives from '../../mock/player_perspectives.json';
//===============================================================[ CLASS ]
class PlayerPerspectiveRequestStrategy
  implements IRequestStrategy<ICheckResponse[]> {
  //-----------------------------------------------------------< methods >
  public async request() {
    const mock: ICheckResponse[] = player_perspectives;
    return mock;

    const { data } = await backend.get<ICheckResponse[]>('player-perspectives');

    return data;
  }
}

export default PlayerPerspectiveRequestStrategy;
