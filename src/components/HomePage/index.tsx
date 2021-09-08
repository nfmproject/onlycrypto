import React from 'react';

import Feed from '../Feed';
import PostBox from '../PostBox';

import {
  Container
} from './styles';

const HomePage: React.FC = () => {
  return (
    <Container>
      <PostBox/>
      <Feed />
    </Container>
  );
};

export default HomePage;
