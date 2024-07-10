import React from "react";
import styled from "styled-components";
import MyItemListItem from "@/components/MyItemListItem";
import {NextPage} from "next";
import { useRouter } from "next/navigation";

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
    itemImage: string;
    time: number;
    price: number;
    likeStatus: boolean;
}

const exampleData: Item[] = [
    {
        "contractId" : 1234,
        "itemName" : "초고속 멀티 충전기",
        "itemImage" : "/img/item-image.png",
        "time" : 5,
        "price" : 3000,
        "likeStatus" : false // 좋아요 여부
    },
    {
        "contractId" : 1235,
        "itemName" : "초고속 멀티 충전기",
        "itemImage" : "",
        "time" : 5,
        "price" : 3000,
        "likeStatus" : true // 좋아요 여부
    },
    {
        "contractId" : 1236,
        "itemName" : "초고속 멀티 충전기",
        "itemImage" : "/img/item-image.png",
        "time" : 5,
        "price" : 3000,
        "likeStatus" : false // 좋아요 여부
    },
    {
        "contractId" : 1237,
        "itemName" : "초고속 멀티 충전기",
        "itemImage" : "/img/item-image.png",
        "time" : 5,
        "price" : 3000,
        "likeStatus" : true // 좋아요 여부
    }
]

const MyItemList = () => {
    const router = useRouter();

    const moveDetail = (contractId: number) => {
        router.push(`/borrow-detail/${contractId}`);
    }
    return (
        <Container>
            {exampleData.map((item) => (
                <MyItemListItem 
                    key={item.contractId} item={item} imageHeight="100px" imageWidth="100px" onClick={() => moveDetail(item.contractId)}
                />
            ))}
        </Container>
    );
}

export default MyItemList;