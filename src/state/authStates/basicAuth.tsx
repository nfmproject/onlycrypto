import { atom } from 'recoil';

// TODO : apply types to the atom
type AuthStatus = 'pending' | 'loading' | 'failed'
export const basicAuthState = atom({
  key: 'auth',
  default: 'pending'
});