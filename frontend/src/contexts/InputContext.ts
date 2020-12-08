import { createContext } from 'react';
//----------------------------------------------------------< interfaces >
import IInputs from '../interfaces/IInputs';
//-------------------------------------------------------------< classes >
import FormSingleton from '../classes/FormSingleton';
//---------------------------------------------------------------< types >
import State from '../types/State';
//=============================================================[ CONTEXT ]

const InputContext = createContext<State<IInputs> | [IInputs, () => void]>([
  FormSingleton.getInstance().inputs,
  () => {},
]);

export default InputContext;
