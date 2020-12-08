//----------------------------------------------------------< interfaces >
import IStrategies from '../../interfaces/IStrategies';
import ICheckResponse from '../../interfaces/ICheckResponse';
//-------------------------------------------------------------< classes >
import GameModesNotificationStrategy from './NotificationStrategy/GameModesNotificationStrategy';
import GameModesUseEffectStrategy from './UseEffectStrategy/GameModesUseEffectStrategy';
import GameModesRequestStrategy from './RequestStrategy/GameModesRequestStrategy';
import FormSingleton from '../FormSingleton';
//===============================================================[ CLASS ]
class GameModesStrategy implements IStrategies<ICheckResponse[]> {
  //--------------------------------------------------------< properties >
  notificationStrategy = new GameModesNotificationStrategy();
  useEffectStrategy = new GameModesUseEffectStrategy();
  requestStrategy = new GameModesRequestStrategy();
  isEmpty = () => !FormSingleton.getInstance().inputs.game_modes;
  result = () => FormSingleton.getInstance().result?.gameModes;
}

export default GameModesStrategy;
