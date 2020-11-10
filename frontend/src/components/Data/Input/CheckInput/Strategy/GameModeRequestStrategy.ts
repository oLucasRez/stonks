//-----------------------------------------------------------------< poo >
import RequestStrategy from '../../RequestStrategy';
//------------------------------------------------------------< services >
import backend from '../../../../../services/backend';
//---------------------------------------------------------------< types >
import CheckResponse from './CheckResponse';
//================================================================[ BODY ]
export default class GameModeRequestStrategy
  implements RequestStrategy<CheckResponse[]> {
  public async request() {
    const { data } = await backend.get<CheckResponse[]>('game-modes');
    return data;
  }
}
