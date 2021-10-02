import React from 'react';
import './App.css';
import { RecoilRoot } from 'recoil';
import { HelmetProvider } from 'react-helmet-async';
import { history, RenderRoutes, RoutesConfig } from './routing';
import { Modals } from './modals';
import { Router } from 'react-router-dom';

// import CeramicAuth from './ceramic';

export default function App() {
  return (
    <Router history={history}>
      <RecoilRoot>
        <HelmetProvider>
          <AppContent />
        </HelmetProvider>
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
