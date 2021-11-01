import styles from './styles.module.css';
import { Button } from '@mui/material';
import AuthButton from '../../components/authButton/authButton';
import { profileType } from '../../ceramicFunctions/ceramicTypes';
import CeramicAuth from '../../ceramic';
import { profileCreate, profileUpdate } from '../../ceramicFunctions/createProfile';
import { createPost, createUser, getUsername } from '../../serverApis';
import { getKey } from '../../unlockProtocol/UnlockServices';

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
    // @ts-ignore
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
    if (!!signature) {
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

  function createPostCall() {
  //   {
  //     "iv": "AiLnkQHPN/EJqsRYk23Zsg==",
  //     "unlockLocks": [
  //         {
  //             "unlocklock": "0x9d0c5540cdd142ce68308a20a129bfb38d7b9f00",
  //             "chainid": 4
  //         }
  //     ],
  //     "post": "bd9sRROch9cOcLcOkniq1JAbYSpWonmigpnrKMBm"
  // }
    const user_did = localStorage.getItem('user_did');
    const cearmic_payload = 'kjzl6cwe1jw14aj2rhab093cndgjsalizmk3j4tvm1wct0lqmivkyyeztf2xr52';
    const signature = localStorage.getItem('did_signature');
    if (!!user_did && !!signature) {
      const payload = {
        did: user_did,
        post_hash: cearmic_payload,
        did_sign: JSON.parse(signature),
      };
      createPost(payload);
    }
  }

  function uploadUnlockKey() {
    const postIV = 'kjzl6cwe1jw14aj2rhab093cndgjsalizmk3j4tvm1wct0lqmivkyyeztf2xr52';
    getKey({ identifier: postIV });
  }

  function fetchUnlockKey() {
    const postIV = 'kjzl6cwe1jw14aj2rhab093cndgjsalizmk3j4tvm1wct0lqmivkyyeztf2xr52';
    const unlockKey = 'kjzl6cwe1jw14aj2rhab093cndgjsalizmk3j4tvm1wct0lqmivkyyeztf2xr52';
    getKey({
      identifier: postIV,
      unlockKey: unlockKey,
      unlockLocks: postIV,
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
      <Button onClick={createPostCall}>create Post</Button>
      <Button onClick={fetchUnlockKey}>fetch Unlock Key</Button>
      <Button onClick={uploadUnlockKey}>upload Unlock Key</Button>
    </div>
  );
}

export default Temp;
