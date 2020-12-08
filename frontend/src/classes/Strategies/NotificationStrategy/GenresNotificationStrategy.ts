//----------------------------------------------------------< interfaces >
import INotificationStrategy from '../../../interfaces/INotificationStrategy';
//-------------------------------------------------------------< classes >
import NotificationManager from '../../NotificationManager';
//===============================================================[ CLASS ]
class GenresNotificationStrategy implements INotificationStrategy {
  //-----------------------------------------------------------< methods >
  public getNotification(notification: NotificationManager): boolean {
    return notification.genresNotification ?? false;
  }

  public setNotification(notification: NotificationManager, value: boolean) {
    notification.genresNotification = value;
  }
}

export default GenresNotificationStrategy;
