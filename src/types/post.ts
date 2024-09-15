export interface Post {
    contractId: number;
    itemId: number;
    itemName: string;
    itemPlace: string;
    price: number;
    time: number;
    contractTime: number;
    itemHash: string[];
    likeStatus: boolean;
    donateStatus: boolean;
}

export interface BorrowPost extends Post {
    itemImage: string;
}

export interface LendPost extends Post {}