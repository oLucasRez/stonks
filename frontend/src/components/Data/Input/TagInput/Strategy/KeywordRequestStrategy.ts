//-----------------------------------------------------------------< poo >
import RequestStrategy from '../../RequestStrategy';
//------------------------------------------------------------< services >
import backend from '../../../../../services/backend';
//---------------------------------------------------------------< types >
import TagResponse from './TagResponse';
//================================================================[ BODY ]
export default class KeywordRequestStrategy
  implements RequestStrategy<TagResponse[]> {
  public async request(startString: string) {
    const { data } = await backend.get<TagResponse[]>('keywords', {
      params: { startString },
    });
    return data;
  }
}
