//----------------------------------------------------------< interfaces >
import IStrategies from '../../interfaces/IStrategies';
import ICheckResponse from '../../interfaces/ICheckResponse';
//-------------------------------------------------------------< classes >
import PlayerPerspectivesNotificationStrategy from './NotificationStrategy/PlayerPerspectivesNotificationStrategy';
import PlayerPerspectivesUseEffectStrategy from './UseEffectStrategy/PlayerPerspectivesUseEffectStrategy';
import PlayerPerspectivesRequestStrategy from './RequestStrategy/PlayerPerspectivesRequestStrategy';
import FormSingleton from '../FormSingleton';
//===============================================================[ CLASS ]
class PlayerPerspectivesStrategy implements IStrategies<ICheckResponse[]> {
  //--------------------------------------------------------< properties >
  notificationStrategy = new PlayerPerspectivesNotificationStrategy();
  useEffectStrategy = new PlayerPerspectivesUseEffectStrategy();
  requestStrategy = new PlayerPerspectivesRequestStrategy();
  isEmpty = () => !FormSingleton.getInstance().inputs.player_perspectives;
  result = () => FormSingleton.getInstance().result?.playerPerspectives;
}

export default PlayerPerspectivesStrategy;
