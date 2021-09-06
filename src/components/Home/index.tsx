import React from 'react';

import HomePage from '../HomePage';

import {
  Container,
  Header,
  BackIcon,
  ProfileInfo,
  BottomMenu,
  HomeIcon,
  SearchIcon,
  BellIcon,
  EmailIcon,
} from './styles';

const Home: React.FC = () => {
  return (
    <Container>
      <Header>

        <ProfileInfo>
          <strong>Home</strong>
        </ProfileInfo>
      </Header>

      <HomePage />

      <BottomMenu>
        <HomeIcon className="active" />
        <SearchIcon />
        <BellIcon />
        <EmailIcon />
      </BottomMenu>
    </Container>
  );
};

export default Home;
