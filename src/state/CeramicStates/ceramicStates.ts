import { atom } from 'recoil';

export enum CeramicStatus {
  IDLE = 'IDLE',
  PENDING = 'PENDING',
  FAILED = 'FAILED',
}

const initialState: CeramicStatus = CeramicStatus.FAILED;

export const ceramicState = atom<CeramicStatus>({
  key: 'ceramicState',
  default: initialState,
});
