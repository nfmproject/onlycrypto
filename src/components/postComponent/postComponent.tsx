import { useState } from 'react';
import CeramicAuth from '../../ceramic';
import PostList from './postList';

function PostComponent({ ...props }: { postHash: string }) {
  const ceramic = CeramicAuth();
  const [content, setContent] = useState('');

  ceramic.readData(props.postHash).then((val) => {
    setContent(val);
  });

  return <div>{JSON.parse(content).username}</div>;
}

export default PostComponent;
