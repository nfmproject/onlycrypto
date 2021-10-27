import React, { useEffect, useState } from 'react';
import FormInput from '../../components/formInput/formInput';
import styles from './styles.module.css';
import { createUser, getDid, getUsername } from '../../serverApis';
import CeramicAuth from '../../ceramic';
import AuthButton from '../../components/authButton/authButton';
import { history } from '../../routing';

function SignUp({ ...props }: any) {
  const [username, setUsername] = useState<string>('');
  const [usernameError, setUsernameError] = useState<string>('');

  const [name, setName] = useState<string>('');
  const [nameError, setNameError] = useState<string>('');

  const ceramic = CeramicAuth();
  function checkUsername() {
    getDid({
      username: username,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.length > 0) {
          setUsernameError('already exists');
        } else {
          setUsernameError('');
        }
      });
  }

  useEffect(() => {
    let debouncer = setTimeout(() => {
      checkUsername();
    }, 500);
    return () => {
      clearTimeout(debouncer);
    };
  }, [username]);

  function signup() {
    console.log('start');
    ceramic.authenticate().then(() => {
      ceramic
        .createData({
          username: username,
          firstName: name,
        })
        .then((res_hash) => {
          ceramic.createJWS(Date.now().toString()).then((token) => {
            const payload = {
              did: localStorage.getItem('user_did'),
              ceramicHash: res_hash,
              userName: username,
              did_sign: token,
            };

            createUser(payload).then((response) => {
              if (response.ok) history.push('/');
              else if (response.status == 409) {
                login();
              }
            });
          });
        })
        .catch((error) => {
          console.error(error);
          return error;
        });
    });
  }

  function login() {
    ceramic.authenticate().then(() => {
      getUsername({ requested_did: localStorage.getItem('user_did') }).then((response) => {
        if (response.ok) {
          response.json().then((val) => {
            localStorage.setItem('username', val[0].username);
          });
          history.push('/');
        }
      });
    });
  }

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
        <button className={styles.submitButton} onClick={signup}>
          Submit
        </button>
        <div className={styles.spanContainer}>
          <span className="font-normal mt-2">
            Already have an account?{' '}
            <a className="text-blue-600" onClick={login}>
              Log In
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
