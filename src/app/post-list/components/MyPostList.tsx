import React, { useState, useCallback, useMemo, useEffect } from "react";
import styled from "styled-components";
import { NextPage } from "next";
import LendItemPost from "@/components/LendItemPost";
import BorrowItemPost from "@/components/BorrowItemPost";
import Category from "@/components/Category";
import { CategoryItemsContainer } from "@/components/CommonStyles";
import api from "@/utils/api";

const Container = styled.div`
  display: block;
  flex-direction: column;
  box-sizing: border-box;
  align-items: center;
  width: 95%;
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
  itemImage: string;
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

interface Data {
  lendingItems: LendingItem[];
  borrowingItems: BorrowingItem[];
}

const MyItemList: NextPage = () => {
  const categories = ["대여하기", "빌려주기", "기부하기"];
  const [selectedCategory, setSelectedCategory] = useState("대여하기");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [myPostList, setMyPostList] = useState<Data>({ lendingItems: [], borrowingItems: [] });
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('token');
      setToken(storedToken);
    }
  }, []);

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  useEffect(() => {
    if (!token) return;

    const fetchItems = async () => {
      setError(null);
      setLoading(true);
      try {
        const response = await api.get(`/mypage/contract/list`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = response.data.data;
        setMyPostList(data);
      } catch (err) {
        const errorMessage = (err as Error).message || 'Something went wrong';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [token]);

  const filteredItems = useMemo(() => {
    if (selectedCategory === "대여하기") {
      return myPostList.lendingItems.map((item) => ({
        ...item,
        type: "borrowing",
        buttonVisible: true,
      }));
    } else if (selectedCategory === "빌려주기") {
      return myPostList.borrowingItems.map((item) => ({
        ...item,
        type: "lending",
        buttonVisible: false,
      }));
    } else if (selectedCategory === "기부하기") {
      return myPostList.borrowingItems.filter((item) => item.donateStatus === true)
        .map((item) => ({
          ...item,
          type: "borrowing",
          buttonVisible: false,
        }));
    } 
    return [];
  }, [selectedCategory, myPostList]);

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
        <PostContainer>
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              item.type === "lending" ? (
                <LendItemPost key={item.contractId} post={item as LendingItem} buttonVisible={item.buttonVisible} />
              ) : (
                <BorrowItemPost key={item.contractId} post={item as BorrowingItem} />
              )
            ))
          ) : (
            <Empty>아직 작성한 게시물이 없습니다.</Empty>
          )}
        </PostContainer>
      </CategoryItemsContainer>
    </Container>
  );
}

export default MyItemList;