//-----------------------------------------------------------------< poo >
import RequestStrategy from '../../RequestStrategy';
//------------------------------------------------------------< services >
import backend from '../../../../../services/backend';
//---------------------------------------------------------------< types >
import CheckResponse from './CheckResponse';
//================================================================[ BODY ]
export default class PlayerPerspectiveRequestStrategy
  implements RequestStrategy<CheckResponse[]> {
  public async request() {
    const { data } = await backend.get<CheckResponse[]>('player-perspectives');

    return data;
  }
}
