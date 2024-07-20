import React, {useState, useCallback, useMemo, useEffect} from "react";
import styled from "styled-components";
import MyItemListItem from "@/components/MyItemListItem";
import { NextPage } from "next";
import { ListContainer, CategoryItemsContainer } from "@/components/CommonStyles";
import Category from "@/components/Category";
import { useRouter } from "next/navigation";
import axios from "axios";

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  width: 95%;
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
  price: number;
  time: number;
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
  const categories = ["대여하기", "기부하기", "빌려주기"];
  const [myHeartList, setMyHeartList] = useState<Data>({lendingItems: [], borrowingItems: []});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const token = localStorage.getItem('token');

  const moveBorrowDetail = (contractId: number) => {
    router.push(`/borrow-detail/${contractId}`);
  }

  const moveLendDetail = (contractId: number) => {
    router.push(`lend-detail/${contractId}`);
  }
  const [selectedCategory, setSelectedCategory] = useState("대여하기");

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  useEffect(() => {
    const fetchItems = async() => {
      setError(null);
      setLoading(true);
      try{
        const response = await axios.get(`/api/likes/list`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = response.data.data;
        setMyHeartList(data);
      } catch(err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [myHeartList]);

  const imageSize = "100%";

  const filteredItems = useMemo(() => {
    if (selectedCategory === "대여하기") {
      return myHeartList.borrowingItems.map((item) => ({
        ...item,
        type: "borrowing",
      }));
    } else if (selectedCategory === "빌려주기") {
      return myHeartList.lendingItems.map((item) => ({
        ...item,
        type: "lending",
      }));
    } else if (selectedCategory === "기부하기") {
      return myHeartList.borrowingItems.filter((item) => item.price === 0)
      .map((item) => ({
        ...item,
        type: "borrowing",
      }));
    } 
  }, [selectedCategory]);

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
    <ListContainer>
      {filteredItems.map((item) => (
        item.type === "lending" ? (
        <ItemContainer key={item.contractId}>
          <MyItemListItem item={item} imageHeight={imageSize} imageWidth={imageSize} onClick={() => {moveLendDetail}} />
        </ItemContainer>
          ) : (
         <ItemContainer key={item.contractId}>
          <MyItemListItem item={item} imageHeight={imageSize} imageWidth={imageSize} onClick={() => {moveBorrowDetail}} />
        </ItemContainer>
          )
      ))}
    </ListContainer>
    </CategoryItemsContainer>
    </Container>
  );
};

export default MyItemList;
