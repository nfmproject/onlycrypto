import { Redirect, Route, Switch } from 'react-router-dom';
import React from 'react';

function RenderRoutes({ routes }: any) {
  return (
    <>
      <Switch>
        {routes.map((route: any, i: any) => {
          return <RouteWithSubRoutes key={route.key} {...route} />;
        })}
        <Route component={() => <h1>Not Found!</h1>} />
      </Switch>
    </>
  );
}

function ProtectedRoutes({ ...props }) {
  //TODO: Change to idx
  if (!localStorage.getItem('user')) {
    alert('You need to log in to access app routes');
    return <Redirect to={'/'} />;
  }
  return <RenderRoutes {...props} />;
}

function RouteWithSubRoutes(route: any) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props: any) => <route.component {...props} routes={route.routes} />}
    />
  );
}

export { RenderRoutes, ProtectedRoutes, RouteWithSubRoutes };
