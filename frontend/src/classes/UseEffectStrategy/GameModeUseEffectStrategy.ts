//-------------------------------------------------------------< classes >
import FormSingleton from '../FormSingleton';
//----------------------------------------------------------< interfaces >
import IUseEffectStrategy from '../../interfaces/IUseEffectStrategy';
import ICheckResponse from '../../interfaces/ICheckResponse';
//================================================================[ CLASS ]
class GameModeUseEffectStrategy implements IUseEffectStrategy {
  //-----------------------------------------------------------< methods >
  public setFormSingleton({
    checks,
    checkResponse,
  }: {
    checks: boolean[];
    checkResponse: ICheckResponse[];
  }) {
    const form = FormSingleton.getInstance();
    const game_modes: number[] = [];

    checks.forEach((check, index) => {
      if (check) game_modes.push(checkResponse[index].id);
    });

    form.inputs.game_modes = game_modes.length ? game_modes : undefined;
  }
}

export default GameModeUseEffectStrategy;
