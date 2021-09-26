import React from 'react';
import { Sidebar } from '../../components/Sidebar';

function Home({ ...props }: any) {
  return (
    <div className="app">
      {/* SIDEBAR */}
      <Sidebar />
      {/* FEED */}
      {/* WIDGETS */}
    </div>
  );
}

export default Home;
