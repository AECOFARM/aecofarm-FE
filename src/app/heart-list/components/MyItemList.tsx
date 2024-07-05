import React from "react";
import styled from "styled-components";
import MyItemListItem from "@/components/MyItemListItem";
import { NextPage } from "next";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 한 줄에 3개 */
  gap: 0px;
  position: relative;
  height: auto;
`;

const ItemContainer = styled.div`
  box-sizing: border-box;
`;

interface Item {
  contractId: number;
  itemName: string;
  image: string;
  time: number;
  price: number;
  likeStatus: boolean;
}

const exampleData: Item[] = [
  {
    contractId: 1234,
    itemName: "초고속 멀티 충전기",
    image: "/img/Item-image.png",
    time: 5,
    price: 3000,
    likeStatus: true, // 좋아요 여부
  },
  {
    contractId: 1235,
    itemName: "초고속 멀티 충전기",
    image: "/img/Item-image.png",
    time: 5,
    price: 3000,
    likeStatus: true, // 좋아요 여부
  },
  {
    contractId: 1236,
    itemName: "초고속 멀티 충전기",
    image: "/img/Item-image.png",
    time: 5,
    price: 3000,
    likeStatus: true, // 좋아요 여부
  },
  {
    contractId: 1237,
    itemName: "초고속 멀티 충전기",
    image: "/img/Item-image.png",
    time: 5,
    price: 3000,
    likeStatus: true, // 좋아요 여부
  },
  {
    contractId: 1237,
    itemName: "초고속 멀티 충전기",
    image: "/img/Item-image.png",
    time: 5,
    price: 3000,
    likeStatus: true, // 좋아요 여부
  },  {
    contractId: 1237,
    itemName: "초고속 멀티 충전기",
    image: "/img/Item-image.png",
    time: 5,
    price: 3000,
    likeStatus: true, // 좋아요 여부
  },  {
    contractId: 1237,
    itemName: "초고속 멀티 충전기",
    image: "/img/Item-image.png",
    time: 5,
    price: 3000,
    likeStatus: true, // 좋아요 여부
  },  {
    contractId: 1237,
    itemName: "초고속 멀티 충전기",
    image: "/img/Item-image.png",
    time: 5,
    price: 3000,
    likeStatus: true, // 좋아요 여부
  },  {
    contractId: 1237,
    itemName: "초고속 멀티 충전기",
    image: "/img/Item-image.png",
    time: 5,
    price: 3000,
    likeStatus: true, // 좋아요 여부
  },
  {
    contractId: 1237,
    itemName: "초고속 멀티 충전기",
    image: "/img/Item-image.png",
    time: 5,
    price: 3000,
    likeStatus: true, // 좋아요 여부
  },
  {
    contractId: 1237,
    itemName: "초고속 멀티 충전기",
    image: "/img/Item-image.png",
    time: 5,
    price: 3000,
    likeStatus: true, // 좋아요 여부
  },
];

const MyItemList: NextPage = () => {
  return (
    <Container>
      {exampleData.map((item) => (
        <ItemContainer>
          <MyItemListItem key={item.contractId} item={item} />
        </ItemContainer>
      ))}
    </Container>
  );
};

export default MyItemList;
