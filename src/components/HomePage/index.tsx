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
              <input type="text" placeholder="What's happening?" />
            </TweetBoxInputInput>
          </TweetBoxInput>
        </Form>
      </TweetBox>

      <ProfileData>


        <EditButton>Post</EditButton>
      </ProfileData>

      <Feed />
    </Container>
  );
};

export default HomePage;
