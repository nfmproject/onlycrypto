import { useEffect } from 'react';
import CeramicAuth from '../../ceramic';
import PostList from '../../components/postComponent/postList';
import { AuthStatus } from '../../state/authStates';

function Home() {
  const ceramic = CeramicAuth();

  // TODO : remove or redirect instead
  useEffect(() => {
    if (ceramic.authState != AuthStatus.AUTHENTICATED) ceramic.authenticate();
  }, []);

  return (
    <div>
      <h1>Hello {localStorage.getItem('username')}</h1>
      <PostList />
    </div>
  );
}

export default Home;
