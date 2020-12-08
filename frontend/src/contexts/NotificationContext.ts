import { createContext } from 'react';
//-------------------------------------------------------------< classes >
import NotificationManager from '../classes/NotificationManager';
//=============================================================[ CONTEXT ]
const NotificationContext = createContext<NotificationManager | null>(null);

export default NotificationContext;
