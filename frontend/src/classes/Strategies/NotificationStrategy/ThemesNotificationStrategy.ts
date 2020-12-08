//----------------------------------------------------------< interfaces >
import INotificationStrategy from '../../../interfaces/INotificationStrategy';
//-------------------------------------------------------------< classes >
import NotificationManager from '../../NotificationManager';
//===============================================================[ CLASS ]
class ThemesNotificationStrategy implements INotificationStrategy {
  //-----------------------------------------------------------< methods >
  public getNotification(notification: NotificationManager): boolean {
    return notification.themesNotification ?? false;
  }

  public setNotification(notification: NotificationManager, value: boolean) {
    notification.themesNotification = value;
  }
}

export default ThemesNotificationStrategy;
