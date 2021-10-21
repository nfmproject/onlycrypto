import React from 'react';
import './App.css';
import { RecoilRoot } from 'recoil';
import { HelmetProvider } from 'react-helmet-async';
import { history, RenderRoutes, RoutesConfig } from './routing';
import { Modals } from './modals';
import { Router } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Button } from '@mui/material';

// import CeramicAuth from './ceramic';

export default function App() {
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

  const render = history.location.pathname == '/signup'
  return (
    <React.Fragment>
      <Sidebar />
      <RenderRoutes routes={RoutesConfig} />
      <Modals />
    </React.Fragment>
  );
}
