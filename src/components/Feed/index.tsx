import React from 'react';

import Tweet from '.';

import { Container, Tab, Tweets } from './style';

const Feed: React.FC = () => {
  return (
    <Container>
      <Tab>Tweets</Tab>

      <Tweets>
        <Tweet />
      </Tweets>
    </Container>
  );
};

export default Feed;