import { Button } from '@mui/material';
import { Sidebar } from '../../components/Sidebar';
// import TweetBox from '../../components/PostBox/whatshappeningbar/TweetBox';
import NewTweetForm from '../../components/PostBox/NewTweetForm';
import TweetList from '../../components/PostBox/TweetList';

function Home() {
  return (
    <div>
      <NewTweetForm newTweetInput={undefined} handleNewTweet={undefined} handleSubmit={undefined} />
      <TweetList tweets={[]} handleLike={undefined}/>
    </div>
  );
}

export default Home;
