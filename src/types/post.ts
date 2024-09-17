export interface LendPost {
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

export interface BorrowPost extends LendPost {
  itemImage: string;
}
