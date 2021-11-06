import React from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import styles from './SettingOption.module.css';

function SettingOption(props: { active: boolean; text: string; handleOnClick: any }) {
  return (
    <div
      className={`${styles.settingOptions} ${props.active && styles.settingActive}`}
      onClick={() => props.handleOnClick(props.text)}
    >
      <h2>{props.text}</h2>
      <KeyboardArrowRightIcon />
    </div>
  );
}

export { SettingOption };
