//----------------------------------------------------------< interfaces >
import INotificationStrategy from '../../../interfaces/INotificationStrategy';
//-------------------------------------------------------------< classes >
import NotificationManager from '../../NotificationManager';
//===============================================================[ CLASS ]
class GameModesNotificationStrategy implements INotificationStrategy {
  //-----------------------------------------------------------< methods >
  public getNotification(notification: NotificationManager): boolean {
    return notification.gameModesNotification ?? false;
  }

  public setNotification(notification: NotificationManager, value: boolean) {
    notification.gameModesNotification = value;
  }
}

export default GameModesNotificationStrategy;
