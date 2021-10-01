import React, { useState } from 'react';
import { SidebarOption } from '../SidebarOptions';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ViewListIcon from '@mui/icons-material/ViewList';
import PersonIcon from '@mui/icons-material/Person';
import TwitterIcon from '@mui/icons-material/Twitter';
import styles from './Sidebar.module.css';
import { Button } from '@mui/material';

const defaultState = [
  {
    text: 'Home',
    inactiveIcon: HomeOutlinedIcon,
    activeIcon: HomeRoundedIcon,
    active: true,
  },
  {
    text: 'Explore',
    inactiveIcon: SearchIcon,
    activeIcon: SearchIcon,
    active: false,
  },
  {
    text: 'Notifications',
    inactiveIcon: NotificationsNoneIcon,
    activeIcon: NotificationsIcon,
    active: false,
  },
  {
    text: 'Messages',
    inactiveIcon: MailOutlineIcon,
    activeIcon: MailRoundedIcon,
    active: false,
  },
  {
    text: 'Bookmarks',
    inactiveIcon: BookmarkBorderIcon,
    activeIcon: BookmarkIcon,
    active: false,
  },
  {
    text: 'Lists',
    inactiveIcon: ListAltIcon,
    activeIcon: ViewListIcon,
    active: false,
  },
  {
    text: 'Profile',
    inactiveIcon: PermIdentityIcon,
    activeIcon: PersonIcon,
    active: false,
  },
  {
    text: 'More',
    inactiveIcon: MoreHorizIcon,
    activeIcon: MoreHorizIcon,
    active: false,
  },
];

function Sidebar() {
  const [SidebarStates, setSidebarStates] = useState(defaultState);

  function setActiveState(text: string) {
    const newState = [...SidebarStates];

    newState.map((item) => {
      if (item.text === text) {
        item.active = true;
      } else {
        item.active = false;
      }
    });

    setSidebarStates(newState);
  }

  return (
    <div className={styles.sidebar}>
      <div className={styles.topSide}>
        <div className={styles.logoWrapper}>
          <TwitterIcon className={styles.logo} />
        </div>
        {SidebarStates.map((SidebarState, idx) => (
          <SidebarOption
            key={idx}
            text={SidebarState.text}
            inactiveIcon={SidebarState.inactiveIcon}
            activeIcon={SidebarState.activeIcon}
            active={SidebarState.active}
            handleOnClick={setActiveState}
          />
        ))}
        <Button variant="outlined" className={styles.sidebarPost}>
          Post
        </Button>
      </div>
      <div className="bottomSide"></div>
    </div>
  );
}

export { Sidebar };
