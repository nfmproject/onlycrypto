import { ROUTES_MAP } from './routes';

const RoutesConfig = [
  {
    path: ROUTES_MAP.singUp.path,
    key: ROUTES_MAP.singUp.key,
    exact: true,
    component: ROUTES_MAP.singUp.component,
  },
  {
    path: ROUTES_MAP.home.path,
    key: ROUTES_MAP.home.key,
    exact: true,
    component: ROUTES_MAP.home.component,
  },
  {
    path: ROUTES_MAP.temp.path,
    key: ROUTES_MAP.temp.key,
    exact: true,
    component: ROUTES_MAP.temp.component,
  },
  {
    path: '/settings',
    key: ROUTES_MAP.settings.key,
    exact: false,
    component: ROUTES_MAP.settings.component,
  },
];

const SubRoutesConfig = [
  {
    path: '/1',
    key: 'settings/1',
    component: ROUTES_MAP.singUp.component,
  },
  {
    path: '/2',
    key: 'settings/2',
    component: ROUTES_MAP.temp.component,
  },
];

export { RoutesConfig, SubRoutesConfig };
