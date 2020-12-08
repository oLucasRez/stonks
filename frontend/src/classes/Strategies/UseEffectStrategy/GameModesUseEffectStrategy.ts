//-------------------------------------------------------------< classes >
import FormSingleton from '../../FormSingleton';
//----------------------------------------------------------< interfaces >
import IUseEffectStrategy from '../../../interfaces/IUseEffectStrategy';
import ICheckResponse from '../../../interfaces/ICheckResponse';
//================================================================[ CLASS ]
class GameModesUseEffectStrategy implements IUseEffectStrategy {
  //-----------------------------------------------------------< methods >
  public setFormSingleton({
    checks,
    checkResponse,
  }: {
    checks: boolean[];
    checkResponse: ICheckResponse[];
  }) {
    const form = FormSingleton.getInstance();
    const game_modes: string[] = [];

    checks.forEach((check, index) => {
      if (check) game_modes.push(checkResponse[index].name);
    });

    form.inputs.game_modes = game_modes.length ? game_modes : null;
  }
}

export default GameModesUseEffectStrategy;
