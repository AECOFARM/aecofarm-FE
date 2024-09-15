import { atom } from "recoil";
import { BorrowPost } from "@/types/post";

export const borrowPostListState = atom<BorrowPost[]>({
  key: "borrowPostListState",
  default: [],
});

export const borrowPostDetailState = atom<BorrowPost>({
  key: "borrowPostDetailState",
  default: {
    contractId: 0,
    itemId: 0,
    itemName: "",
    itemImage: "",
    itemPlace: "",
    price: 0,
    time: 0,
    contractTime: 0,
    itemHash: [],
    likeStatus: false,
    donateStatus: false,
  },
});
