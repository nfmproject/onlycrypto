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

  const [avatar, setAvatar] = useState<string>('https://www.w3schools.com/howto/img_avatar.png');

  const [name, setName] = useState<string>('');
  const [nameError, setNameError] = useState<string>('');

  const [pwdError, setPwdError] = useState<string>('');
  const [pwd, setPwd] = useState<PwdState>({
    password: '',
    showPassword: false,
  });
  const [selectedFile, setSelectedFile] = useState();

  const changeHandler = (event: any) => {
    setSelectedFile(event.target.files[0]);
    const formData = new FormData();

    formData.append('File', avatar);
    //todo file upload code
  };

  return (
    <div className={styles.main}>
      <div className={styles.col1}></div>
      <div className={styles.col2}>
        {/* <div className="mb-4">
          <AvatarPicker avatar={avatar} changeHandler={changeHandler} />
        </div> */}
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
          <FormInput value={name} setValue={setName} label={'FullName'} error={nameError} />
        </div>
        <div className={styles.inputFields}>
          <PasswordInput values={pwd} setValues={setPwd} label={'Password'} error={pwdError} />
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
