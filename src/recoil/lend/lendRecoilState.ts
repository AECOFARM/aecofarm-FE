import { atom } from "recoil";
import { LendPost } from "@/types/post";

export const lendPostListState = atom<LendPost[]>({
    key: 'lendPostListState',
    default: [],
});

export const lendPostDetailState = atom<LendPost>({
    key: 'lendPostDetailState',
    default: {
        contractId: 0,
        itemId: 0,
        itemName: "",
        itemPlace: "",
        price: 0,
        time: 0,
        contractTime: 0,
        itemHash: [],
        likeStatus: false,
        donateStatus: false,
    },
});