import Home from '../pages/home/home';

export const ROUTES_MAP = {
  home: {
    component: Home,
    path: '/',
    key: 'ROOT',
  },
  login: {
    component: Home,
    path: '/login',
    key: 'LOGIN',
  },
};
