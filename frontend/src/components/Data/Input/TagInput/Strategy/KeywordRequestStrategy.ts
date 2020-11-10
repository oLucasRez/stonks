//-----------------------------------------------------------------< poo >
import RequestStrategy from '../../RequestStrategy';
//------------------------------------------------------------< services >
import backend from '../../../../../services/backend';
//---------------------------------------------------------------< types >
import TagResponse from './TagResponse';
//================================================================[ BODY ]
export default class KeywordRequestStrategy
  implements RequestStrategy<TagResponse[]> {
  public async request() {
    const { data } = await backend.get<TagResponse[]>('keywords', {
      params: { page: 0 },
    });
    return data;
  }
}
