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

interface Item {
  contractId: number;
  itemName: string;
  itemImage: string;
  time: number;
  price: number;
  likeStatus: boolean;
}

interface itemList {
  itemList: Item[];
}

const MyItemList: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const token = localStorage.getItem('token');
  const [items, setItems] = useState<itemList>({ itemList: [] });

  const moveDetail = (contractId: number) => {
    router.push(`/borrow-detail/${contractId}`);
  }

  useEffect(() => {
    const fetchHistory = async () => {
      setError(null);
      setLoading(true);
      try {
        const response = await axios.get(`/api/mypage/get`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const history = response.data.data.history;
        setItems({ itemList: history });
      } catch (err) {
        if (err instanceof AxiosError) {
          setError(new Error(err.response?.data?.message || 'Something went wrong'));
        } else {
          setError(new Error('Something went wrong'));
        }
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [token]);

  return (
    <Container>
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: 'red' }}>{error.message}</div>}
      {items.itemList.map((item) => (
        <MyItemListItem 
          key={item.contractId} 
          item={item} 
          imageHeight="100px" 
          imageWidth="100px" 
          onClick={() => moveDetail(item.contractId)} 
        />
      ))}
    </Container>
  );
}

export default MyItemList;
