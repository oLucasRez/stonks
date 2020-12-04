//-------------------------------------------------------------< classes >
//----------------------------------------------------------< interfaces >
import IResults from '../interfaces/IResults';
//---------------------------------------------------------------< pages >
//----------------------------------------------------------< components >
//------------------------------------------------------------< services >
//---------------------------------------------------------------< hooks >
//------------------------------------------------------------< contexts >
//---------------------------------------------------------------< utils >
import intersectArrays from '../utils/intersectArrays';
//--------------------------------------------------------------< assets >
//--------------------------------------------------------------< styles >
//---------------------------------------------------------------< types >
//===============================================================[ CLASS ]
class ResultManager {
  //--------------------------------------------------------< properties >
  private hypeMax = 1007;
  private followsMax = 1693.26074;
  private totalRatingMax = 90.12769;
  //----------------------------------------------------------------------
  private result: IResults;
  //----------------------------------------------------------------------
  public visualizedChanges: any;
  //-----------------------------------------------------------< methods >
  public constructor(result: IResults) {
    this.result = result;
    this.visualizedChanges = this.nonVisualizedChanges();
  }
  //----------------------------------------------------------------------
  public nonVisualizedChanges() {
    // inputs
    const gameEngine = !!this.getGameEngines();
    const releaseDate = !!this.getReleaseDates();
    const price = !!this.getPrice();

    // subforms
    const profile = false;
    const specifications = gameEngine;
    const publish = releaseDate || price;

    // form
    const form = profile || specifications || publish;

    return {
      value: form,
      subforms: [
        {
          value: profile,
        },
        {
          value: specifications,
          gameEngine,
        },
        {
          value: publish,
          releaseDate,
          price,
        },
      ],
    };
  }
  //----------------------------------------------------------------------
  public getScore() {
    return (
      (this.getHypeScore() +
        this.getFollowsScore() +
        this.getTotalRatingScore() * 4) /
      6
    );
  }

  public getHypeScore() {
    const { hype } = this.result;
    return parseFloat(hype.predict) / this.hypeMax;
  }

  public getFollowsScore() {
    const { follows } = this.result;
    return parseFloat(follows.predict) / this.followsMax;
  }

  public getTotalRatingScore() {
    const { total_rating } = this.result;
    return parseFloat(total_rating.predict) / this.totalRatingMax;
  }
  //----------------------------------------------------------------------
  public getGameEngines() {
    const { hype, follows, total_rating } = this.result;
    let gameEngines: string[] | undefined;

    if (hype.engine_names && follows.engine_names && total_rating.engine_names)
      gameEngines = intersectArrays<string>(
        hype.engine_names,
        follows.engine_names,
        total_rating.engine_names
      );
    else if (hype.engine_names && follows.engine_names)
      gameEngines = intersectArrays<string>(
        hype.engine_names,
        follows.engine_names
      );
    else if (hype.engine_names && total_rating.engine_names)
      gameEngines = intersectArrays<string>(
        hype.engine_names,
        total_rating.engine_names
      );
    else if (follows.engine_names && total_rating.engine_names)
      gameEngines = intersectArrays<string>(
        follows.engine_names,
        total_rating.engine_names
      );

    return gameEngines;
  }

  public getReleaseDates() {
    const { hype, follows, total_rating } = this.result;
    let releaseDates: string[] | undefined;

    if (
      hype.release_dates &&
      follows.release_dates &&
      total_rating.release_dates
    )
      releaseDates = intersectArrays<string>(
        hype.release_dates,
        follows.release_dates,
        total_rating.release_dates
      );
    else if (hype.release_dates && follows.release_dates)
      releaseDates = intersectArrays<string>(
        hype.release_dates,
        follows.release_dates
      );
    else if (hype.release_dates && total_rating.release_dates)
      releaseDates = intersectArrays<string>(
        hype.release_dates,
        total_rating.release_dates
      );
    else if (follows.release_dates && total_rating.release_dates)
      releaseDates = intersectArrays<string>(
        follows.release_dates,
        total_rating.release_dates
      );

    return releaseDates;
  }

  public getPrice() {
    const { hype, follows, total_rating } = this.result;
    let price: number | undefined;

    if (hype.price && follows.price && total_rating.price)
      price =
        parseFloat(hype.price) +
        parseFloat(follows.price) +
        parseFloat(total_rating.price);
    else if (hype.price && follows.price)
      price = parseFloat(hype.price) + parseFloat(follows.price);
    else if (hype.price && total_rating.price)
      price = parseFloat(hype.price) + parseFloat(total_rating.price);
    else if (follows.price && total_rating.price)
      price = parseFloat(follows.price) + parseFloat(total_rating.price);

    return price;
  }
}

export default ResultManager;
