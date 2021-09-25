import React from 'react';
import './App.css';
import { RecoilRoot } from 'recoil';
import { HelmetProvider } from 'react-helmet-async';
import { ROUTES, RenderRoutes } from './routing/index.js';
import { Modals } from './modals/index';

export default function App() {
  return (
    <RecoilRoot>
      <HelmetProvider>
        <AppContent />
        <Modals />
      </HelmetProvider>
    </RecoilRoot>
  );
}

function AppContent() {
  return (
    <React.Fragment>
      <RenderRoutes routes={ROUTES} />
    </React.Fragment>
  );
}
