import { createContext } from 'react';
import dark from '../styles/themes/dark';

const ColorContext = createContext(dark.colors.primary[0]);

export default ColorContext;
