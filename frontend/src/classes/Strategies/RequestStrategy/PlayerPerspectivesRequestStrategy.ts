//----------------------------------------------------------< interfaces >
import IRequestStrategy from '../../../interfaces/IRequestStrategy';
import ICheckResponse from '../../../interfaces/ICheckResponse';
//------------------------------------------------------------< services >
import main_server from '../../../services/main_server';
//----------------------------------------------------------------< mock >
import player_perspectives from '../../../mock/player_perspectives.json';
//===============================================================[ CLASS ]
class PlayerPerspectivesRequestStrategy
  implements IRequestStrategy<ICheckResponse[]> {
  //-----------------------------------------------------------< methods >
  public async request() {
    const mock: ICheckResponse[] = player_perspectives;
    return mock;

    const { data } = await main_server.get<ICheckResponse[]>(
      'player-perspectives'
    );

    return data;
  }
}

export default PlayerPerspectivesRequestStrategy;
