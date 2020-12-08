//----------------------------------------------------------< interfaces >
import IStrategies from '../../interfaces/IStrategies';
import ITagResponse from '../../interfaces/ITagResponse';
//-------------------------------------------------------------< classes >
import GenresNotificationStrategy from './NotificationStrategy/GenresNotificationStrategy';
import GenresUseEffectStrategy from './UseEffectStrategy/GenresUseEffectStrategy';
import GenresRequestStrategy from './RequestStrategy/GenresRequestStrategy';
import FormSingleton from '../FormSingleton';
//===============================================================[ CLASS ]
class GenresStrategy implements IStrategies<ITagResponse[]> {
  //--------------------------------------------------------< properties >
  notificationStrategy = new GenresNotificationStrategy();
  useEffectStrategy = new GenresUseEffectStrategy();
  requestStrategy = new GenresRequestStrategy();
  isEmpty = () => !FormSingleton.getInstance().inputs.genres;
  result = () => FormSingleton.getInstance().result?.genres;
}

export default GenresStrategy;
