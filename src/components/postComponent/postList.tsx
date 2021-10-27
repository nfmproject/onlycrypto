import { useEffect, useState } from 'react';
import CeramicAuth from '../../ceramic';
import { getPosts } from '../../serverApis';
import PostComponent from './postComponent';

interface postType {
  id: number;
  created_at: string;
  user_did: string;
  likes: number;
  post_hash: string;
}
function PostList({ ...props }: any) {
  const ceramic = CeramicAuth();
  const [posts, setPosts] = useState<Array<postType>>([]);

  useEffect(() => {
    getPosts().then((val: any) => {
      setPosts(val);
    });
  }, []);

  return (
    <div>
      {posts.map((post, i) => {
        return (
          <div key={i}>
            <PostComponent postHash={post.post_hash} /> <br />
          </div>
        );
      })}
    </div>
  );
}

export default PostList;
