//----------------------------------------------------------< interfaces >
import IRequestStrategy from '../../../interfaces/IRequestStrategy';
import ICheckResponse from '../../../interfaces/ICheckResponse';
//------------------------------------------------------------< services >
import backend from '../../../services/backend';
//----------------------------------------------------------------< mock >
import game_modes from '../../../mock/game_modes.json';
//===============================================================[ CLASS ]
class GameModesRequestStrategy implements IRequestStrategy<ICheckResponse[]> {
  //-----------------------------------------------------------< methods >
  public async request() {
    const mock: ICheckResponse[] = game_modes;
    return mock;

    const { data } = await backend.get<ICheckResponse[]>('game-modes');

    return data;
  }
}

export default GameModesRequestStrategy;
