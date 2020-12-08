//----------------------------------------------------------< interfaces >
import INotificationStrategy from '../../../interfaces/INotificationStrategy';
//-------------------------------------------------------------< classes >
import NotificationManager from '../../NotificationManager';
//===============================================================[ CLASS ]
class PlayerPerspectivesNotificationStrategy implements INotificationStrategy {
  //-----------------------------------------------------------< methods >
  public getNotification(notification: NotificationManager): boolean {
    return notification.playerPerspectivesNotification ?? false;
  }

  public setNotification(notification: NotificationManager, value: boolean) {
    notification.playerPerspectivesNotification = value;
  }
}

export default PlayerPerspectivesNotificationStrategy;
