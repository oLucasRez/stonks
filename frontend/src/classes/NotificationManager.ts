//-------------------------------------------------------------< classes >
import FormSingleton from './FormSingleton';
//===============================================================[ CLASS ]
class NotificationManager {
  //--------------------------------------------------------< properties >
  public genresNotification: boolean;
  public themesNotification: boolean;

  public timeToBeatNotification: boolean;
  public playerPerspectivesNotification: boolean;
  public gameModesNotification: boolean;

  public ageRatingNotification: boolean;
  public priceNotification: boolean;
  public releaseDateNotification: boolean;
  //-----------------------------------------------------------< methods >
  constructor() {
    const form = FormSingleton.getInstance();

    this.genresNotification = !!form.result?.genres;
    this.themesNotification = !!form.result?.themes;

    this.timeToBeatNotification = !!form.result?.timeToBeat;
    this.playerPerspectivesNotification = !!form.result?.playerPerspectives;
    this.gameModesNotification = !!form.result?.gameModes;

    this.ageRatingNotification = !!form.result?.ageRating;
    this.priceNotification = !!form.result?.price;
    this.releaseDateNotification = !!form.result?.releaseDate;
  }
  //----------------------------------------------------------------------
  public profileNotification = () =>
    this.genresNotification || this.themesNotification;

  public specificationsNotification = () =>
    this.timeToBeatNotification ||
    this.playerPerspectivesNotification ||
    this.gameModesNotification;

  public publishNotification = () =>
    this.ageRatingNotification ||
    this.priceNotification ||
    this.releaseDateNotification;

  public notification = () =>
    this.publishNotification() ||
    this.specificationsNotification() ||
    this.profileNotification();
}

export default NotificationManager;
