import React, { useState, useCallback, useMemo, useEffect } from "react";
import styled from "styled-components";
import BorrowItemPost from "@/components/BorrowItemPost";
import LendItemPost from "@/components/LendItemPost";
import Category from "@/components/Category";
import { CategoryItemsContainer } from "@/components/CommonStyles";
import api from "@/utils/api"; // 수정된 API import

const Container = styled.div`
  display: block;
  flex-direction: column;
  box-sizing: border-box;
  align-items: center;
  width: 95%;
`;

const ContractContainer = styled.div`
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
  itemImage?: string;
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

interface ItemList {
  lendingItems: LendingItem[];
  borrowingItems: BorrowingItem[];
}

const MyContractList = () => {
  const [selectedCategory, setSelectedCategory] = useState("대여하기");
  const categories = ["대여하기", "빌려주기", "기부하기"];
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [contractList, setContractList] = useState<ItemList>({ lendingItems: [], borrowingItems: [] });

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await api.get("/mypage/contract/complete/list");
        setContractList(data.data);
      } catch (err) {
        const errorMessage = (err as Error).message || 'Something went wrong';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const filteredItems = useMemo(() => {
    if (selectedCategory === "대여하기") {
      return contractList.borrowingItems.map((item) => ({
        ...item,
        type: "borrowing",
      }));
    } else if (selectedCategory === "빌려주기") {
      return contractList.lendingItems.map((item) => ({
        ...item,
        type: "lending",
      }));
    } else if (selectedCategory === "기부하기") {
      return contractList.borrowingItems.filter((item) => item.donateStatus === true)
        .map((item) => ({
          ...item,
          type: "borrowing",
        }));
    }
    return [];
  }, [selectedCategory, contractList]);

  return (
    <Container>
      <CategoryContainer>
        <Category selectedCategory={selectedCategory} onSelectCategory={handleCategoryChange} categories={categories} />
      </CategoryContainer>
      <CategoryItemsContainer>
        <ContractContainer>
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              item.type === "lending" ? (
                <LendItemPost key={item.contractId} post={item} buttonVisible={true}/>
              ) : (
                <BorrowItemPost key={item.contractId} post={item} />
              )
            ))
          ) : (
            <Empty>거래 내역이 없습니다.</Empty>
          )}
        </ContractContainer>
      </CategoryItemsContainer>
    </Container>
  );
};

export default MyContractList;
