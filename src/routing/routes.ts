import Home from '../pages/home/home';
import SignUp from '../pages/signup/singup';
import Temp from '../pages/temp/temp';

export const ROUTES_MAP = {
  home: {
    component: Home,
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
};
