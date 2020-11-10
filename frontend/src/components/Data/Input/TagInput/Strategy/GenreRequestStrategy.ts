//-----------------------------------------------------------------< poo >
import RequestStrategy from '../../RequestStrategy';
//------------------------------------------------------------< services >
import backend from '../../../../../services/backend';
//---------------------------------------------------------------< types >
import TagResponse from './TagResponse';
//================================================================[ BODY ]
export default class GenreRequestStrategy
  implements RequestStrategy<TagResponse[]> {
  public async request() {
    const { data } = await backend.get<TagResponse[]>('genres');
    return data;
  }
}
