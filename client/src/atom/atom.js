import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const userInfoState = atom({
  key: 'userInfoState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const commentAtom = atom({
  key: 'commentAtom',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const mypageOwnerAtom = atom({
  key: 'mypageOwnerAtom',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const infoToEvalue = atom({
  key: 'infoToEvalue',
  default: {},
  effects_UNSTABLE: [persistAtom],
});

export const evalueDataArr = atom({
  key: 'evalueDataArr',
  default: [],
  effects_UNSTABLE: [persistAtom],
});
