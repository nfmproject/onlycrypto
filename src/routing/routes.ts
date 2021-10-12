import Home from '../pages/home/home';
import SignUp from '../pages/signup/singup';

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
};
