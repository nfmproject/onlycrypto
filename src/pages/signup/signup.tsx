import React, { useState } from 'react';
import FormInput from '../../components/formInput/formInput';
import styles from './styles.module.css';
import { PasswordInput, PwdState } from '../../components/formInput/passwordInput';
// check if avatar picker is needed or not
import { AvatarPicker } from '../../components/avatarPicker';
import styleFunctionSx from '@mui/system/styleFunctionSx';

function SignUp({ ...props }: any) {
  const [username, setUsername] = useState<string>('');
  const [usernameError, setUsernameError] = useState<string>('');

  const [name, setName] = useState<string>('');
  const [nameError, setNameError] = useState<string>('');

  return (
    <div className={styles.main}>
      <div className={styles.col1}></div>
      <div className={styles.col2}>
        <div className={styles.logo}></div>
        <div className={styles.headingContainer}>
          <span className={styles.heading}>Join NFM today.</span>
        </div>
        <div className={styles.inputFields}>
          <FormInput
            value={username}
            setValue={setUsername}
            label={'Username'}
            error={usernameError}
          />
        </div>
        <div className={styles.inputFields}>
          <FormInput value={name} setValue={setName} label={'Name'} error={nameError} />
        </div>
        <button className={styles.submitButton}>Submit</button>
        <div className={styles.spanContainer}>
          <span className="font-normal mt-2">
            Already have an account?{' '}
            <a className="text-blue-600" href="#">
              Log In
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
