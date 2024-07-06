import React, { useState, useCallback, useMemo } from "react";
import styled from "styled-components";
import MyItemListItem from "@/components/MyItemListItem";
import {NextPage} from "next";
import { ListContainer } from "@/components/CommonStyles";
import LendItemPost from "@/components/LendItemPost";
import BorrowItemPost from "@/components/BorrowItemPost";
import Category from "@/components/Category";
import { CategoryItemsContainer } from "@/components/CommonStyles";

const Container = styled.div`
  display: block;
  flex-direction: column;
  box-sizing: border-box;
  align-items: center;
  width: 100%;
`;

const PostContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CategoryContainer = styled.div`
  position: fixed;
  top: 110px;
  z-index: 100;
  display: flex;
  width: 100%;
  max-width: 500px;
  align-items: flex-start;
`;

interface LendingItem {
  contractId: number;
  itemName: string;
  price: number;
  itemPlace: string;
  time: number;
  contractTime: number;
  itemHash: string[];
  likeStatus: boolean;
  donateStatus: boolean;
}

interface BorrowingItem {
  contractId: number;
  itemName: string;
  itemImage: string;
  price: number;
  itemPlace: string;
  time: number;
  contractTime: number;
  itemHash: string[];
  likeStatus: boolean;
  donateStatus: boolean;
}

interface ExampleData {
  lendingItems: LendingItem[];
  borrowingItems: BorrowingItem[];
}
  
  const exampleData: ExampleData = {
    lendingItems: [
      {
        "contractId": 1,
        "itemName" : "충전기",
        "price" : 1000,
        "itemPlace" : "신공학관",
        "time" : 2, // 대여 가능 시간 (ex. 3시간)
        "contractTime" : 10, // 거래 가능 시간 (ex. 10분 이내)
        "itemHash" : [
         "빠른거래", "급해요", "신공"
        ],
        "likeStatus" : true, // 좋아요 여부
        "donateStatus" : false // 기부하기 여부
     },
     {
        "contractId": 2,
        "itemName" : "키보드",
        "price" : 5000,
        "itemPlace" : "학생회관",
        "time" : 4, // 대여 가능 시간 (ex. 3시간)
        "contractTime" : 10, // 거래 가능 시간 (ex. 10분 이내)
        "itemHash" : [
         "빠른거래", "급해요", "키보드"
        ],
        "likeStatus" : false, // 좋아요 여부
        "donateStatus" : false // 기부하기 여부
     }
    ],
    borrowingItems: [
      {
        "contractId" : 3,
        "itemName" : "초고속 멀티 충전기",
        "itemImage" : "/img/item-image.png",
        "price" : 3000,
        "itemPlace" : "중앙도서관",
        "time" : 5, // 대여 가능 시간 (ex. 3시간)
        "contractTime" : 10, // 거래 가능 시간 (ex. 10분 이내)
        "itemHash" : [
         "중도지킴이", "빠른거래가능", "초고속"
        ],
        "likeStatus" : true, // 좋아요 여부
        "donateStatus" : false // 기부하기 여부
    },
    {
      "contractId" : 4,
      "itemName" : "초고속 멀티 충전기",
      "itemImage" : "/img/item-image.png",
      "price" : 3000,
      "itemPlace" : "중앙도서관",
      "time" : 5, // 대여 가능 시간 (ex. 3시간)
      "contractTime" : 10, // 거래 가능 시간 (ex. 10분 이내)
      "itemHash" : [
       "중도지킴이", "빠른거래가능", "초고속"
      ],
      "likeStatus" : true, // 좋아요 여부
      "donateStatus" : false // 기부하기 여부
  }
    ]
  };

const MyItemList: NextPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("전체");

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  const filteredItems = useMemo(() => {
    if (selectedCategory === "대여하기") {
      return exampleData.borrowingItems.map((item) => ({
        ...item,
        type: "borrowing",
      }));
    } else if (selectedCategory === "빌려주기") {
      return exampleData.lendingItems.map((item) => ({
        ...item,
        type: "lending",
      }));
    } else {
      return [
        ...exampleData.borrowingItems.map((item) => ({
          ...item,
          type: "borrowing",
        })),
        ...exampleData.lendingItems.map((item) => ({
          ...item,
          type: "lending",
        })),
      ];
    }
  }, [selectedCategory]);

    return (
      <Container>
        <CategoryContainer>
          <Category 
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategoryChange}
          />
        </CategoryContainer>
        <CategoryItemsContainer>
        <PostContainer>
          {filteredItems.map((item) => (
            item.type === "lending" ? (
              <LendItemPost key={item.contractId} post={item as LendingItem} />
            ) : (
              <BorrowItemPost key={item.contractId} post={item as BorrowingItem} />
            )
          ))}
        </PostContainer>
        </CategoryItemsContainer>
      </Container>
    );
}

export default MyItemList;