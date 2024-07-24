// src/state/atoms.ts
import { atom } from 'recoil';

export const tagsState = atom<{ value: string }[]>({
  key: 'tagsState',
  default: [],
});
