import Landing from '../pages/home/home';
import Home from '../pages/home/home';

export const ROUTES_MAP = {
  home: {
    component: Landing,
    path: '/',
    key: 'ROOT',
  },
  login: {
    component: Home,
    path: '/home',
    key: 'HOME',
  },
};
