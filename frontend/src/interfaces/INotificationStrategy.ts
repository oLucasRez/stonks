//-------------------------------------------------------------< classes >
import NotificationManager from '../classes/NotificationManager';
//===========================================================[ INTERFACE ]
interface INotificationStrategy {
  getNotification(notification: NotificationManager): boolean;
  setNotification(notification: NotificationManager, value: boolean): void;
}

export default INotificationStrategy;
