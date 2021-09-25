import { RenderRoutes } from './router';
const ROUTES = [
  { path: '/', key: 'ROOT', exact: true, component: () => <h1>Log in</h1> },
  {
    path: '/app',
    key: 'APP',
    component: RenderRoutes, // here's the update
    routes: [
      {
        path: '/app',
        key: 'APP_ROOT',
        exact: true,
        component: () => <h1>App Index</h1>,
      },
      {
        path: '/app/page',
        key: 'APP_PAGE',
        exact: true,
        component: () => <h1>App Page</h1>,
      },
    ],
  },
];

export { ROUTES };
