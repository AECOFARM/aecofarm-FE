import React, { useState, useCallback, useMemo, useEffect } from "react";
import styled from "styled-components";
import MyItemListItem from "@/components/MyItemListItem";
import { NextPage } from "next";
import Category from "@/components/Category";
import { CategoryItemsContainer } from "@/components/CommonStyles";
import { useRouter } from "next/navigation";
import api from "@/utils/api";

interface Item {
  contractId: number;
  itemName: string;
  itemImage: string;
  time: number;
  price: number;
  likeStatus?: boolean;
  type?: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 95%;
`;

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 한 줄에 3개 */
  row-gap: 5px;
  column-gap: 5px;
  position: relative;
  height: auto;
  margin: 0 auto;
`;

const ItemContainer = styled.div``;

const CategoryContainer = styled.div`
  position: fixed;
  top: 100px;
  z-index: 100;
  display: flex;
  width: 100%;
  max-width: 500px;
  align-items: flex-start;
`;

const Empty = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--black);
  margin: 10px auto;
  width: 100%;
`;

interface LendingItem {
  contractId: number;
  itemName: string;
  price: number;
  time: number;
  itemImage: string;
}

interface BorrowingItem {
  contractId: number;
  itemName: string;
  itemImage: string;
  price: number;
  time: number;
}

interface Data {
  lendingItems: LendingItem[];
  borrowingItems: BorrowingItem[];
}

const MyItemList: NextPage = () => {
  const categories = ["대여하기", "빌려주기", "기부하기"];
  const [myHeartList, setMyHeartList] = useState<Data>({
    lendingItems: [],
    borrowingItems: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const moveBorrowDetail = (contractId: number) => {
    router.push(`/borrow-detail/${contractId}`);
  };

  const moveLendDetail = (contractId: number) => {
    router.push(`lend-detail/${contractId}`);
  };

  const [selectedCategory, setSelectedCategory] = useState("대여하기");

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      setError(null);
      setLoading(true);
      try {
        const response = await api.get(`/likes/list`);
        const data = response.data.data;
        setMyHeartList(data);
      } catch (err) {
        const errorMessage = (err as Error).message || "Something went wrong";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const imageSize = 100;

  const filteredItems = useMemo(() => {
    let items: Item[] = [];

    if (selectedCategory === "대여하기") {
      items = myHeartList.borrowingItems;
    } else if (selectedCategory === "빌려주기") {
      items = myHeartList.lendingItems as Item[]; // Type assertion
    } else if (selectedCategory === "기부하기") {
      items = myHeartList.borrowingItems
        .filter((item) => item.price === 0)
        .map((item) => ({
          ...item,
          type: "borrowing",
        }));
    }
    return items;
  }, [selectedCategory, myHeartList]);

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
        {filteredItems.length > 0 ? (
          <ListContainer>
            {filteredItems.map((item) => (
              <ItemContainer key={item.contractId}>
                <MyItemListItem
                  item={item}
                  imageHeight={imageSize}
                  imageWidth={imageSize}
                  onClick={() => {
                    if (item.type === "lending") {
                      moveLendDetail(item.contractId);
                    } else {
                      moveBorrowDetail(item.contractId);
                    }
                  }}
                />
              </ItemContainer>
            ))}
          </ListContainer>
        ) : (
          <Empty>아직 좋아요를 누른 게시물이 없습니다.</Empty>
        )}
      </CategoryItemsContainer>
    </Container>
  );
};

export default MyItemList;
