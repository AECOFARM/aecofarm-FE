import React from "react";
import styled from "styled-components";
import MyItemListItem from "@/components/MyItemListItem";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  overflow-y: hidden;
  width: 100%;
`;

const Empty = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.black};
  margin: 10px auto;
`;

interface Item {
  contractId: number;
  itemName: string;
  itemImage: string;
  time: number;
  price: number;
  likeStatus: boolean;
}

const MyItemList = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem("token");
  const [itemList, setItemList] = useState<Item[]>([]);

  const moveDetail = (contractId: number) => {
    router.push(`/borrow-detail/${contractId}`);
  };

  useEffect(() => {
    const fetchHistory = async () => {
      setError(null);
      setLoading(true);
      try {
        const response = await axios.get(`/api/mypage/get`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const history = response.data.data.history;
        setItemList(history);
      } catch (err) {
        const errorMessage = (err as Error).message || "Something went wrong";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [token]);

  return (
    <Container>
      {itemList.length > 0 ? (
        itemList.map((item) => (
          <MyItemListItem
            key={item.contractId}
            item={item}
            imageHeight={100}
            imageWidth={100}
            onClick={() => moveDetail(item.contractId)}
          />
        ))
      ) : (
        <Empty>최근 본 물품이 없습니다.</Empty>
      )}
    </Container>
  );
};

export default MyItemList;
