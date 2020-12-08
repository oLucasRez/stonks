//----------------------------------------------------------< interfaces >
import IStrategies from '../../interfaces/IStrategies';
import ITagResponse from '../../interfaces/ITagResponse';
//-------------------------------------------------------------< classes >
import ThemesNotificationStrategy from './NotificationStrategy/ThemesNotificationStrategy';
import ThemesUseEffectStrategy from './UseEffectStrategy/ThemesUseEffectStrategy';
import ThemesRequestStrategy from './RequestStrategy/ThemesRequestStrategy';
import FormSingleton from '../FormSingleton';
//===============================================================[ CLASS ]
class ThemesStrategy implements IStrategies<ITagResponse[]> {
  //--------------------------------------------------------< properties >
  notificationStrategy = new ThemesNotificationStrategy();
  useEffectStrategy = new ThemesUseEffectStrategy();
  requestStrategy = new ThemesRequestStrategy();
  isEmpty = () => !FormSingleton.getInstance().inputs.themes;
  result = () => FormSingleton.getInstance().result?.themes;
}

export default ThemesStrategy;
