import { atom } from "recoil";

export const likedPostListState = atom({
  key: "likedPostsState",
  default: [],
});

export const myPostListState = atom({
  key: "myPostListState",
  default: [],
});
