import { atom } from "recoil";
import { UserInfo } from "@/types/user";

export const userState = atom({
  key: "userState",
  default: {
    isLoggedIn: false,
  },
});

export const userInfoState = atom<UserInfo>({
  key: "userInfoState",
  default: {
    userName: "",
    email: "",
    image: "",
    point: 0,
  },
});
