import { createContext } from 'react';
//--------------------------------------------------------------< styles >
import dark from '../styles/themes/dark';
//=============================================================[ CONTEXT ]
const ColorContext = createContext(dark.colors.primary[0]);

export default ColorContext;
