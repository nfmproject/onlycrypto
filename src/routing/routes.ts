import Landing from '../pages/landing/landing';
import Home from '../pages/home/home';

export const ROUTES_MAP = {
  login: {
    component: Landing,
    path: '/',
    key: 'LOGIN',
    
  },
  home: {
    component: Home,
    path: '/home',
    key: 'ROOT',
  },
};
