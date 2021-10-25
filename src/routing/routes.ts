import SignUp from '../pages/signup/signup';
import Temp from '../pages/temp/temp';
import Settings from '../pages/settings/settings';
import Home from '../pages/home/home';

export const ROUTES_MAP = {
  home: {
    component: Home,
    path: '/',
    key: 'ROOT',
  },
  signUp: {
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
