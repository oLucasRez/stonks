//----------------------------------------------------------< interfaces >
import INotificationStrategy from './INotificationStrategy';
import IUseEffectStrategy from './IUseEffectStrategy';
import IRequestStrategy from './IRequestStrategy';
//===========================================================[ INTERFACE ]
interface IStrategies<T> {
  notificationStrategy: INotificationStrategy;
  useEffectStrategy: IUseEffectStrategy;
  requestStrategy: IRequestStrategy<T>;
  isEmpty: () => boolean;
  result: () => any;
}

export default IStrategies;
