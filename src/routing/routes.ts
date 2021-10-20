import SignUp from '../pages/signup/singup';
import Temp from '../pages/temp/temp';
import Settings from '../pages/settings/settings';

export const ROUTES_MAP = {
  home: {
    component: Temp,
    path: '/',
    key: 'ROOT',
  },
  singUp: {
    component: SignUp,
    path: '/signup',
    key: 'SIGNUP',
  },
  temp: {
    component: Temp,
    path: '/temp',
    key: 'TEMP',
  },
  settings: {
    component: Settings,
    path: '/setting',
    key: 'SETTINGS',
  },
};
