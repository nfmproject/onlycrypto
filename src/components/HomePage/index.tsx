import React from 'react';

import Feed from '../Feed';

import {
  Container,
  Banner,
  Avatar,
  ProfileData,
  EditButton,
  LocationIcon,
  CakeIcon,
  Followage,
  TweetBox,
  TweetBoxInput,
  Form,
  TweetBoxInputImage,
  TweetBoxInputInput
} from './styles';

const HomePage: React.FC = () => {
  return (
    <Container>

      <TweetBox>
        <Form>
          <TweetBoxInput>
            <TweetBoxInputInput>
              <textarea placeholder="What's happening?" />
            </TweetBoxInputInput>
          </TweetBoxInput>
        </Form>
        <ProfileData>
        <EditButton>Post</EditButton>
      </ProfileData>
      </TweetBox>

      <Feed />
    </Container>
  );
};

export default HomePage;
