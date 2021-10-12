import React, { ChangeEventHandler, FunctionComponent } from 'react';
import styles from '../../pages/signup/styles.module.css';
import { Avatar, IconButton } from '@mui/material';

interface OwnProps {
  avatar: string;
  changeHandler: ChangeEventHandler<HTMLInputElement>;
  size?: number;
}

type Props = OwnProps;

export const AvatarPicker: FunctionComponent<Props> = ({ avatar, changeHandler, size }) => {
  return (
    <>
      <input
        onChange={changeHandler}
        accept="image/*"
        id="icon-button-file"
        className={styles.input}
        type="file"
      />
      <label htmlFor="icon-button-file">
        <IconButton color="primary" aria-label="upload picture" component="span">
          <Avatar alt="Cindy Baker" src={avatar} sx={{ width: size ?? 80, height: size ?? 80 }} />
        </IconButton>
      </label>
    </>
  );
};
