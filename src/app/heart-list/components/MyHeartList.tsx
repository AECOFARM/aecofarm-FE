import React, {useState, useCallback, useMemo} from "react";
import styled from "styled-components";
import MyItemListItem from "@/components/MyItemListItem";
import { NextPage } from "next";
import { ListContainer, CategoryItemsContainer } from "@/components/CommonStyles";
import Category from "@/components/Category";

const Container = styled.div`
  display: flex;
  align-items: flex-start;
`;

const ItemContainer = styled.div`
  box-sizing: border-box;
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
  time: number;
  price: number;
}

interface BorrowingItem {
  contractId: number;
  itemName: string;
  itemImage: string;
  time: number;
  price: number;
}

interface ExampleData {
  lendingItems: LendingItem[];
  borrowingItems: BorrowingItem[];
}

const exampleData: ExampleData = {
  lendingItems: [
    {
      "contractId": 1234,
      "itemName": "초고속 멀티 충전기",
      "time": 5,
      "price": 3000,
    },
    {
      "contractId": 1235,
      "itemName": "초고속 멀티 충전기",
      "time": 5,
      "price": 3000,
    },
  ],
  borrowingItems: [
    {
      "contractId": 1236,
      "itemName": "초고속 멀티 충전기",
      "itemImage": "/img/Item-image.png",
      "time": 5,
      "price": 3000,
    },
    {
      "contractId": 1237,
      "itemName": "초고속 멀티 충전기",
      "itemImage": "/img/Item-image.png",
      "time": 5,
      "price": 3000,
    },
    {
      "contractId": 1238,
      "itemName": "초고속 멀티 충전기",
      "itemImage": "/img/Item-image.png",
      "time": 5,
      "price": 3000,
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
      return exampleData.lendingItems;
    } else if (selectedCategory === "빌려주기") {
      return exampleData.borrowingItems;
    } else {
      return [...exampleData.lendingItems, ...exampleData.borrowingItems];
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
    <ListContainer>
      {filteredItems.map((item) => (
        <ItemContainer key={item.contractId}>
          <MyItemListItem item={item} />
        </ItemContainer>
      ))}
    </ListContainer>
    </CategoryItemsContainer>
    </Container>
  );
};

export default MyItemList;