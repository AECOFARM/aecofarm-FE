import React, {useCallback, useState} from "react";
import styled from "styled-components";
import AlarmListItem from "./AlarmListItem";
import Category from "@/components/Category";
import { CategoryItemsContainer } from "@/components/CommonStyles";

const Container = styled.div`
  display: block;
  flex-direction: column;
  box-sizing: border-box;
  align-items: center;
  width: 95%;
`;

const CategoryContainer = styled.div`
  position: fixed;
  top: 110px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
`;

const AlarmContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

interface Alarm {
    status: string;
    userName: string;
    memberStatus: string;
    contractId: number;
    itemName: string;
    image: string;
    time: Date;
}

interface AlarmList {
    lending: Alarm[];
    borrowing: Alarm[];
}

const exampleData: AlarmList = {
    lending: [
      {
        "status" : "REQUEST",
        "userName" : "이정선",
        "memberStatus" : "LEND",
        "contractId" : 1234,
        "itemName": "초고속 멀티 충전기",
        "image" : "/img/item-image.png",
        "time": new Date("2024-05-05"),
      },
      {
        "status" : "REQUEST",
        "userName" : "이정선",
        "memberStatus" : "BORROW",
        "contractId" : 1235,
        "itemName": "초고속 멀티 충전기",
        "image" : "/img/item-image.png",
        "time": new Date("2024-05-05"),
      },
      {
        "status" : "COMPLETE",
        "userName" : "이정선",
        "memberStatus" : "LEND",
        "contractId" : 1236,
        "itemName": "초고속 멀티 충전기",
        "image" : "/img/item-image.png",
        "time": new Date("2024-05-05"),
      },
      {
        "status" : "COMPLETE",
        "userName" : "이정선",
        "memberStatus" : "BORROW",
        "contractId" : 1237,
        "itemName": "초고속 멀티 충전기",
        "image" : "/img/item-image.png",
        "time": new Date("2024-05-05"),
      },
    ],
    borrowing: [
      {
        "status" : "REQUEST",
        "userName" : "이정선",
        "memberStatus" : "LEND",
        "contractId" : 1238,
        "itemName": "초고속 멀티 충전기",
        "image" : "/img/item-image.png",
        "time": new Date("2024-05-05"),
      },
      {
        "status" : "REQUEST",
        "userName" : "이정선",
        "memberStatus" : "BORROW",
        "contractId" : 1239,
        "itemName": "초고속 멀티 충전기",
        "image" : "/img/item-image.png",
        "time": new Date("2024-05-05"),
      },
      {
        "status" : "ACCEPT",
        "userName" : "이정선",
        "memberStatus" : "LEND",
        "contractId" : 1240,
        "itemName": "초고속 멀티 충전기",
        "image" : "/img/item-image.png",
        "time": new Date("2024-05-05"),
      },
      {
        "status" : "ACCEPT",
        "userName" : "이정선",
        "memberStatus" : "BORROW",
        "contractId" : 1241,
        "itemName": "초고속 멀티 충전기",
        "image" : "/img/item-image.png",
        "time": new Date("2024-05-05"),
      },
      {
        "status" : "REJECT",
        "userName" : "이정선",
        "memberStatus" : "LEND",
        "contractId" : 1242,
        "itemName": "초고속 멀티 충전기",
        "image" : "/img/item-image.png",
        "time": new Date("2024-05-05"),
      },
      {
        "status" : "REJECT",
        "userName" : "이정선",
        "memberStatus" : "BORROW",
        "contractId" : 1243,
        "itemName": "초고속 멀티 충전기",
        "image" : "/img/item-image.png",
        "time": new Date("2024-05-05"),
      }
   ],
};

const AlarmList: React.FC<AlarmList> = () => {
    const categories = ["전체", "대여하기", "빌려주기"];
    const [selectedCategory, setSelectedCategory] = useState("전체");

    const handleCategoryChange = useCallback((category: string) => {
        setSelectedCategory(category);
    }, []);

    const filteredData = selectedCategory === "전체"
      ? [
        ...exampleData.lending.map((item) => ({ ...item, category: "lending" })),
        ...exampleData.borrowing.map((item) => ({ ...item, category: "borrowing" }))
      ]
      : selectedCategory === "빌려주기"
      ? exampleData.lending.map((item) => ({ ...item, category: "lending" }))
      : exampleData.borrowing.map((item) => ({ ...item, category: "borrowing" }));

    return (
        <Container>
            <CategoryContainer>
                <Category
                selectedCategory={selectedCategory}
                onSelectCategory={handleCategoryChange}
                categories={categories}
                />
            </CategoryContainer>
            <CategoryItemsContainer>
                <AlarmContainer>
                    {filteredData.map((alarm, index) => (
                        <AlarmListItem key={index} alarm={alarm} category={alarm.category}/>
                        
                    ))}
                </AlarmContainer>
            </CategoryItemsContainer>
        </Container>
    );
}

export default AlarmList;