import Landing from '../pages/home/home';
import Home from '../pages/home/home';

export const ROUTES_MAP = {
  login: {
    component: Landing,
    path: '/',
    key: 'ROOT',
  },
  home: {
    component: Home,
    path: '/home',
    key: 'HOME',
  },
};
