import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { Route, Switch, useHistory } from 'react-router-dom';
import { useThemeContext } from '../../hooks/useTheme';
import { SettingOption } from '../../components/SettingOptions';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const defaultState = [
  {
    text: 'Setting 1',
    active: true,
    path: '/settings/1',
  },
  {
    text: 'Setting 2',
    active: false,
    path: '/settings/2',
  },
  {
    text: 'Setting 3',
    active: false,
    path: '/settings/3',
  },
  {
    text: 'Setting 4',
    active: false,
    path: '/settings/4',
  },
  {
    text: 'Setting 5',
    active: false,
    path: '/settings/5',
  },
];

function Settings() {
  const [SettingStates, setSettingStates] = useState(defaultState);
  const theme = useThemeContext();
  const history = useHistory();

  function setActiveState(text: string) {
    const newState = [...SettingStates];

    newState.map((item) => {
      if (item.text === text) {
        item.active = true;
      } else {
        item.active = false;
      }
    });
    //TODO Refine names suck
    const details = defaultState.find((item) => item.text === text);
    const path = details?.path ?? '/settings/1';

    setSettingStates(newState);
    console.log(path);
    history.push(path);
  }

  return (
    <>
      <div className="flex flex-col border-r border-outline">
        <div className={styles.header}>Settings</div>
        <div className={styles.mainContent}>
          {SettingStates.map((SettingState, idx) => (
            <SettingOption
              key={idx}
              text={SettingState.text}
              active={SettingState.active}
              handleOnClick={setActiveState}
            />
          ))}
        </div>
      </div>

      <Switch>
        <Route
          path="/settings/1"
          exact
          component={() => (
            <div className="flex flex-col border-r border-outline w-full">
              <div className={styles.header}>Setting 1</div>
              <span className="text-text-primary text-sm opacity-60 p-3">
                Some normie shit about what this setting is about
              </span>
              <div
                className={styles.innerSettingOption}
                onClick={() => console.log('yippe this is not functional yet')}
              >
                <CreateOutlinedIcon className="text-text-primary mx-7" />
                <div className="text-text-primary flex flex-col w-full">
                  Account Information
                  <span className="text-text-primary text-sm opacity-60">
                    See your account info like your number and email address
                  </span>
                </div>
                <KeyboardArrowRightIcon className="text-text-primary mr-3" />
              </div>
            </div>
          )}
        />
        <Route
          path="/settings/2"
          exact
          component={() => <div className="text-text-primary !important">shoelaces2!</div>}
        />
        <Route
          path="/settings/3"
          exact
          component={() => <div className="text-text-primary !important">shoelaces3!</div>}
        />
        <Route
          path="/settings/4"
          exact
          component={() => <div className="text-text-primary !important">shoelaces4!</div>}
        />
        <Route
          path="/settings/5"
          exact
          component={() => <div className="text-text-primary !important">shoelaces5!</div>}
        />
      </Switch>
    </>
  );
}

export default Settings;
