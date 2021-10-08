import { atom } from 'recoil';

// TODO : apply types to the atom
type PostStatus = 'pending' | 'loading' | 'failed';
export const tileState = atom({
  key: 'auth',
  default: 'pending',
});
