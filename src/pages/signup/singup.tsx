import React, { useState } from 'react';
import FormInput from '../../components/formInput/formInput';
import styles from './styles.module.css';
import { PasswordInput, PwdState } from '../../components/formInput/passwordInput';
import { AvatarPicker } from '../../components/avatarPicker';

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
      <AvatarPicker avatar={avatar} changeHandler={changeHandler} />
      <FormInput value={username} setValue={setUsername} label={'Username'} error={usernameError} />
      <FormInput value={name} setValue={setName} label={'FullName'} error={nameError} />
      <PasswordInput values={pwd} setValues={setPwd} label={'Password'} error={pwdError} />
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-14 rounded-full'>
        Submit
      </button>
    </div>
  );
}

export default SignUp;
