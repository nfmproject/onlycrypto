import React, { useEffect } from 'react';
import styles from './styles.module.css';
import { Route, Switch, useHistory } from 'react-router-dom';

function Settings({ ...props }: any) {
  const history = useHistory();
  useEffect(() => {
    history.push('/settings/1');
  }, []);

  return (
    <>
      <div
        className={styles.mainContent}
        onClick={() => {
          console.log('cliekd');
          history.push('/settings/2');
        }}
      >
        {' '}
        Content route 2
      </div>
      <Switch>
        <Route path='/settings/1' exact component={() => <div>shoelaces!</div>} />
        <Route path='/settings/2' exact component={() => <div>shoelaces2!</div>} />
      </Switch>
    </>
  );
}

export default Settings;
