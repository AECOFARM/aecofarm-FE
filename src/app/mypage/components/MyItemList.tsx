import React from "react";
import styled from "styled-components";
import MyItemListItem from "@/components/MyItemListItem";
import {NextPage} from "next";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  overflow-y: hidden;
  width: 100%;
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
        "contractId" : 1234,
        "itemName" : "초고속 멀티 충전기",
        "image" : "/img/Item-image.png",
        "time" : 5,
        "price" : 3000,
        "likeStatus" : true // 좋아요 여부
    },
    {
        "contractId" : 1235,
        "itemName" : "초고속 멀티 충전기",
        "image" : "/img/Item-image.png",
        "time" : 5,
        "price" : 3000,
        "likeStatus" : true // 좋아요 여부
    },
    {
        "contractId" : 1236,
        "itemName" : "초고속 멀티 충전기",
        "image" : "/img/Item-image.png",
        "time" : 5,
        "price" : 3000,
        "likeStatus" : true // 좋아요 여부
    },
    {
        "contractId" : 1237,
        "itemName" : "초고속 멀티 충전기",
        "image" : "/img/Item-image.png",
        "time" : 5,
        "price" : 3000,
        "likeStatus" : true // 좋아요 여부
    }
]

const MyItemList: NextPage = () => {
    return (
        <Container>
            {exampleData.map((item) => (
                <MyItemListItem 
                    key={item.contractId} item={item}
                />
            ))}
        </Container>
    );
}

export default MyItemList;