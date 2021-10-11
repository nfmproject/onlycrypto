import React from 'react';
import styles from './SettingsPage.module.css';

function SettingsPage() {
  return (
    <div className={styles.settingsPage}>
      <div className={styles.settingList}>This is div 1</div>
      <div className={styles.settingListOptions}>This is div 2</div>
    </div>
  );
}

export { SettingsPage };
