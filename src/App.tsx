import React, { useEffect, useState } from 'react';
import './App.css';
import { RecoilRoot, useRecoilState } from 'recoil';
import { HelmetProvider } from 'react-helmet-async';
import { history, RenderRoutes, RoutesConfig } from './routing';
import { Modals } from './modals';
import { Router } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';

import { AuthStatus, basicAuthState } from './state/authStates';
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
  const [authState, setAuthState] = useRecoilState(basicAuthState);
  useEffect(()=>{
    if(!!localStorage.getItem('user_did') && localStorage.getItem('user_did') != '') {
     setAuthState(AuthStatus.SOFT) 
    }
  },[])

  const render = history.location.pathname == '/signup'
  return (
    <React.Fragment>
      <Sidebar />
      <RenderRoutes routes={RoutesConfig} />
      <Modals />
    </React.Fragment>
  );
}
