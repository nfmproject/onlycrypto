import styles from './styles.module.css';
import { Button } from '@mui/material';
import AuthButton from '../../components/authButton/authButton';
import { profileType } from '../../ceramicFunctions/ceramicTypes';
import CeramicAuth from '../../ceramic';
import { profileCreate, profileUpdate } from '../../ceramicFunctions/createProfile';

function Temp({ ...props }: any) {
  const ceramic = CeramicAuth();

  function submitProfile() {
    const profile: profileType = {
      username: 'iamzubin',
      firstName: 'zubin',
      lastName: 'choudhary',
      description: "I'm a software developer ;)",
      gender: 'Male',
      residenceCountry: 'IN',
    };
    profileCreate(ceramic, profile);
  }

  function fetchProfile() {
    ceramic.readData('kjzl6cwe1jw14aj2rhab093cndgjsalizmk3j4tvm1wct0lqmivkyyeztf2xr52');
  }

  function updateProfile() {
    const profile: profileType = {
      username: 'iamzubin',
      firstName: 'zubin',
      lastName: 'choudhary',
      description: "I'm a software developer updated ;)",
      gender: 'Male',
      residenceCountry: 'IN',
    };
    profileUpdate(
      ceramic,
      'kjzl6cwe1jw14aj2rhab093cndgjsalizmk3j4tvm1wct0lqmivkyyeztf2xr52',
      profile,
    );
  }
  return (
    <div className={styles.main}>
      <AuthButton />
      <Button onClick={submitProfile}>Upload Profile</Button>
      <Button onClick={fetchProfile}>Fetch Profile</Button>
      <Button onClick={updateProfile}>Update Profile</Button>
    </div>
  );
}

export default Temp;
