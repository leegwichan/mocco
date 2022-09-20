import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const commentAtom = atom({
  key: 'commentAtom',
  default: [],
  effects_UNSTABLE: [persistAtom],
});
