//----------------------------------------------------------< interfaces >
import IRequestStrategy from '../../interfaces/IRequestStrategy';
import ICheckResponse from '../../interfaces/ICheckResponse';
//------------------------------------------------------------< services >
import backend from '../../services/backend';
//===============================================================[ CLASS ]
class GameModeRequestStrategy implements IRequestStrategy<ICheckResponse[]> {
  //-----------------------------------------------------------< methods >
  public async request() {
    const { data } = await backend.get<ICheckResponse[]>('game-modes');

    return data;
  }
}

export default GameModeRequestStrategy;
