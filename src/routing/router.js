import { Route, Switch , Redirect } from 'react-router-dom'; 

function ProtectedRoutes({ ...props }) {
    if (!localStorage.getItem('user')) {
      alert('You need to log in to access app routes');
      return <Redirect to={'/'} />;
    }
    return <RenderRoutes {...props} />;
  }

  
function RenderRoutes({ routes }) {
  return (
    <Switch>
      {routes.map((route, i) => {
        return <RouteWithSubRoutes key={route.key} {...route} />;
      })}
      <Route component={() => <h1>Not Found!</h1>} />
    </Switch>
  );
}

function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) => <route.component {...props} routes={route.routes} />}
    />
  );
}



export { RenderRoutes, ProtectedRoutes };
