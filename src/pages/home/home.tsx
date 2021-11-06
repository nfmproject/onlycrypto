import { Button, Container } from '@mui/material';
import { Sidebar } from '../../components/Sidebar';
import NewTweetForm from '../../components/PostBox/NewTweetForm';
import Feed from '../../components/Feed';

function Home() {
  return (
    <>
    <div>
      <NewTweetForm newTweetInput={undefined} handleNewTweet={undefined} handleSubmit={undefined} />
    </div>
    <div>
      <Feed />
    </div>
    </>
  );
}

export default Home;
