import React from 'react';
import { Sidebar } from '../../components/Sidebar';

function Home({ ...props }: any) {
  return (
    <div>
      <Sidebar />
    </div>
  );
}

export default Home;
