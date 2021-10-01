import React from 'react';
import './App.css';
import { RecoilRoot, useRecoilState } from 'recoil';
import { HelmetProvider } from 'react-helmet-async';
import { history, RenderRoutes, RoutesConfig } from './routing';
import { Modals } from './modals';
import { Router } from 'react-router-dom';
import { basicAuthState } from './state/authStates/basicAuth';
// import CeramicAuth from './ceramic';

export default function App() {
  // const ceramic = CeramicAuth();
  const [authState, setAuthState] = useRecoilState(basicAuthState)
  return (
    <Router history={history}>
      <RecoilRoot>
        <div className="app">
          <HelmetProvider>
            <AppContent />
          </HelmetProvider>
        </div>
      </RecoilRoot>
    </Router>
  );
}

function AppContent() {
  return (
    <React.Fragment>
      <RenderRoutes routes={RoutesConfig} />
      <Modals />
    </React.Fragment>
  );
}
