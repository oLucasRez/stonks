//-------------------------------------------------------------< classes >
import FormSingleton from '../FormSingleton';
//----------------------------------------------------------< interfaces >
import IUseEffectStrategy from '../../interfaces/IUseEffectStrategy';
import ICheckResponse from '../../interfaces/ICheckResponse';
//===============================================================[ CLASS ]
class PlayerPerspectiveUseEffectStrategy implements IUseEffectStrategy {
  //-----------------------------------------------------------< methods >
  public setFormSingleton({
    checks,
    checkResponse,
  }: {
    checks: boolean[];
    checkResponse: ICheckResponse[];
  }) {
    const form = FormSingleton.getInstance();
    const player_perspectives: number[] = [];

    checks.forEach((check, index) => {
      if (check) player_perspectives.push(checkResponse[index].id);
    });

    form.inputs.player_perspectives = player_perspectives.length
      ? player_perspectives
      : undefined;
  }
}

export default PlayerPerspectiveUseEffectStrategy;
