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
];

export { RoutesConfig };
