import React from "react";
import styled from "styled-components";
import MyItemListItem from "@/components/MyItemListItem";
import { NextPage } from "next";
import { ListContainer } from "@/components/CommonStyles";

const ItemContainer = styled.div`
  box-sizing: border-box;
`;

interface Item {
  contractId: number;
  itemName: string;
  itemImage: string;
  time: number;
  price: number;
}

const exampleData: Item[] = [
  {
    contractId: 1234,
    itemName: "초고속 멀티 충전기",
    itemImage: "/img/Item-image.png",
    time: 5,
    price: 3000,
  },
  {
    contractId: 1235,
    itemName: "초고속 멀티 충전기",
    itemImage: "/img/Item-image.png",
    time: 5,
    price: 3000,
  },
  {
    contractId: 1236,
    itemName: "초고속 멀티 충전기",
    itemImage: "/img/Item-image.png",
    time: 5,
    price: 3000,
  },
  {
    contractId: 1237,
    itemName: "초고속 멀티 충전기",
    itemImage: "/img/Item-image.png",
    time: 5,
    price: 3000,
  },
  {
    contractId: 1237,
    itemName: "초고속 멀티 충전기",
    itemImage: "/img/Item-image.png",
    time: 5,
    price: 3000,
  },  {
    contractId: 1237,
    itemName: "초고속 멀티 충전기",
    itemImage: "/img/Item-image.png",
    time: 5,
    price: 3000,
  },  {
    contractId: 1237,
    itemName: "초고속 멀티 충전기",
    itemImage: "/img/Item-image.png",
    time: 5,
    price: 3000,
  },  {
    contractId: 1237,
    itemName: "초고속 멀티 충전기",
    itemImage: "/img/Item-image.png",
    time: 5,
    price: 3000,
  },  
  {
    contractId: 1237,
    itemName: "초고속 멀티 충전기",
    itemImage: "/img/Item-image.png",
    time: 5,
    price: 3000,
  },
  {
    contractId: 1237,
    itemName: "초고속 멀티 충전기",
    itemImage: "/img/Item-image.png",
    time: 5,
    price: 3000,
  },
  {
    contractId: 1237,
    itemName: "초고속 멀티 충전기",
    itemImage: "/img/Item-image.png",
    time: 5,
    price: 3000,
  },
];

const MyItemList: NextPage = () => {
  return (
    <ListContainer>
      {exampleData.map((item) => (
        <ItemContainer key={item.contractId}>
          <MyItemListItem item={item} />
        </ItemContainer>
      ))}
    </ListContainer>
  );
};

export default MyItemList;
