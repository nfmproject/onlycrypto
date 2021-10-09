import { atom } from 'recoil';

export enum AuthStatus {
  PENDING,
  AUTHENTICATED,
  LOADING,
  FAILED,
}

const initialState: AuthStatus = AuthStatus.PENDING;

export const basicAuthState = atom<AuthStatus>({
  key: 'auth',
  default: initialState,
});
