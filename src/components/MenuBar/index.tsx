import { TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { fromString } from 'uint8arrays';
import { AuthState, useApp } from '../../state';

import Button from '../Button';

import {
  Container,
  Topside,
  Logo,
  MenuButton,
  HomeIcon,
  ProfileIcon,
  Botside,
  Avatar,
  ProfileData,
  ExitIcon,
} from './styles';


type AuthenticateProps = {
  authenticate: (seed: Uint8Array) => void
  state: AuthState
}

function AuthenticateScreen({ authenticate, state }: AuthenticateProps) {
  const [seed, setSeed] = useState('2fb8d63fe0697b8086c94cf05728b06b60af9e68cac5c48d616de7498371a125')
  const isLoading = state.status === 'loading'

  return state.status === 'done' ? (
    <Typography>{state.idx.id}</Typography>
  ) : (
    <>
      <Button
        color="primary"
        disabled={seed === '' || isLoading}
        onClick={() => authenticate(fromString(seed, 'base16'))}
        >
        Authenticate
      </Button>
    </>
  )
}





const MenuBar: React.FC = () => {
  const app = useApp()
  return (
    <Container>
      <Topside>
        <Logo />

        <MenuButton>
          <HomeIcon />
          <span>Home</span>
        </MenuButton>

        {/* <MenuButton>
          <ExploreIcon />
          <span>Explore</span>
        </MenuButton>

        <MenuButton>
          <BellIcon />
          <span>Notifications</span>
        </MenuButton>

        <MenuButton>
          <EmailIcon />
          <span>Messages</span>
        </MenuButton>

        <MenuButton>
          <FavoriteIcon />
          <span>Bookmarks</span>
        </MenuButton>

        <MenuButton>
          <ListIcon />
          <span>Lists</span>
        </MenuButton> */}

        <MenuButton className="active">
          <ProfileIcon />
          <span>Profile</span>
        </MenuButton>
        <AuthenticateScreen
        authenticate={app.authenticate}
        state={app.state.auth} />
        <Button>
          <span>Post</span>
        </Button>
      </Topside>

      <Botside>
        <Avatar>
          <img
            src="https://avatars1.githubusercontent.com/u/53025782?s=400&u=f1ffa8eaccb8545222b7c642532161f11e74a03d&v=4"
            alt="Elton Lazzarin"
          />
        </Avatar>

        <ProfileData>
          <strong>Elton Lazzarin</strong>
          <span>@elton_lazzarin</span>
        </ProfileData>

        <ExitIcon />
      </Botside>
    </Container>
  );
};

export default MenuBar;
