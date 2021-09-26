import { ROUTES_MAP } from './routes';

const RoutesConfig = [
  {
    path: ROUTES_MAP.home.path,
    key: ROUTES_MAP.home.key,
    exact: true,
    component: ROUTES_MAP.home.component,
  },
  {
    path: ROUTES_MAP.login.path,
    key: ROUTES_MAP.login.key,
    component: ROUTES_MAP.login.component,
  },
];

export { RoutesConfig };
