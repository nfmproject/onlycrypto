import AuthButton from '../components/authButton/authButton';
import Home from '../pages/home/home';

export const ROUTES_MAP = {
  home: {
    component: Home,
    path: '/',
    key: 'ROOT',
  },
  login: {
    component: AuthButton,
    path: '/login',
    key: 'LOGIN',
  },
};
