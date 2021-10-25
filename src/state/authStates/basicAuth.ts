import { atom } from 'recoil';

export enum AuthStatus {
  PENDING = 'PENDING',
  SOFT = 'SOFT',
  AUTHENTICATED = 'AUTHENTICATED',
  LOADING = 'LOADING',
  FAILED = 'FAILED',
}

const initialState: AuthStatus = AuthStatus.PENDING;

export const basicAuthState = atom<AuthStatus>({
  key: 'auth',
  default: initialState,
});
