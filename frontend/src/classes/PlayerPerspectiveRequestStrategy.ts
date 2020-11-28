//----------------------------------------------------------< interfaces >
import IRequestStrategy from '../interfaces/IRequestStrategy';
import ICheckResponse from '../interfaces/ICheckResponse';
//------------------------------------------------------------< services >
import backend from '../services/backend';
//===============================================================[ CLASS ]
class PlayerPerspectiveRequestStrategy
  implements IRequestStrategy<ICheckResponse[]> {
  //-----------------------------------------------------------< methods >
  public async request() {
    const { data } = await backend.get<ICheckResponse[]>('player-perspectives');

    return data;
  }
}

export default PlayerPerspectiveRequestStrategy;
