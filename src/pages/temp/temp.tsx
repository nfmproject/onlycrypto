import styles from './styles.module.css';
import { Button } from '@mui/material';
import AuthButton from '../../components/authButton/authButton';
import { profileType } from '../../ceramicFunctions/ceramicTypes';
import CeramicAuth from '../../ceramic';
import { profileCreate, profileUpdate } from '../../ceramicFunctions/createProfile';
import { createPost, createUser, getUsername } from '../../serverApis';
import { getKey, postUnlockData } from '../../unlockProtocol/UnlockServices';
import { createPostCall } from '../../posts/postfunctions';
import { fetchKeyPayload } from '../../unlockProtocol/types';

function Temp() {
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
  function ceramicJWS() {
    ceramic.createJWS('payload').then((val) => {
      localStorage.setItem('did_signature', JSON.stringify(val));
    });
  }

  function registerUser() {
    const signature = localStorage.getItem('did_signature');
    const user_did = localStorage.getItem('user_did');
    if (!!signature && !!user_did) {
      const payload = {
        did: user_did,
        userName: 'iamzubin',
        ceramicHash: 'kjzl6cwe1jw14aj2rhab093cndgjsalizmk3j4tvm1wct0lqmivkyyeztf2xr52',
        did_sign: JSON.parse(signature),
      };
      createUser(payload);
    }
  }

  function fetchUser() {
    const user_did = localStorage.getItem('user_did');
    getUsername({ requested_did: user_did })
      .then((res) => res.json())
      .then((res) => {
        console.log(res[0].username);
        console.log(res[0].ceramic_hash);
      });
  }

  function createPost() {
    createPostCall(ceramic, { data: "data" })
  }

  function fetchUnlockKey() {
    const data : fetchKeyPayload = {
      identifier: 'taest1x',
      chain: 4,
      lock: "0x1fbbcbf0858ec308c77c41f4b52e0a60f1a7cb0e",
      address : "0x3a574461fd1279fcf96043bcf416c53b7e8dcec0"

    }
    getKey(data).then((resp) => {
      console.log(resp)
    })

  }

  function uploadUnlockKey() {
    const postIV = 'taest1x';
    const unlockKey = 'fasdf';
    postUnlockData({
      identifier: postIV,
      unlockKey: unlockKey,
      unlockLocks: [{
        chainid: 4,
        unlocklock: "0x1fbbcbf0858ec308c77c41f4b52e0a60f1a7cb0e"
      }],
    });
  }

  return (
    <div className={styles.main}>
      <AuthButton />
      <Button onClick={submitProfile}>Upload Profile</Button>
      <Button onClick={ceramic.logoutOfWeb3Modal}>logout1 Profile</Button>
      <Button onClick={fetchProfile}>Fetch Profile</Button>
      <Button onClick={updateProfile}>Update Profile</Button>
      <Button onClick={ceramicJWS}>Signature to LocalStorage</Button>
      <Button onClick={registerUser}>Upload Profile Supabase</Button>
      <Button onClick={fetchUser}>download Profile Supabase</Button>
      <Button onClick={createPost}>create Post</Button>
      <Button onClick={fetchUnlockKey}>fetch Unlock Key</Button>
      <Button onClick={uploadUnlockKey}>upload Unlock Key</Button>
    </div>
  );
}

export default Temp;
