import { Dispatch, SetStateAction } from 'react';

type State<T> = [T, Dispatch<SetStateAction<T>>];

export default State;
