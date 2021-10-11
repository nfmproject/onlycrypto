import React from 'react';
import { SettingsPage } from '../../components/SettingsPage';
import { Sidebar } from '../../components/Sidebar';

function Home({ ...props }: any) {
  return (
    <>
      <Sidebar />
      <SettingsPage />
    </>
  );
}

export default Home;
