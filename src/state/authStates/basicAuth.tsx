import { atom } from 'recoil';

export const basicAuthState = atom({
  key: 'auth',
  default: false,
});