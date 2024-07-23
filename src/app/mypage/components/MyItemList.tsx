import React from "react";
import styled from "styled-components";
import MyItemListItem from "@/components/MyItemListItem";
import {NextPage} from "next";
import { useRouter } from "next/navigation";
import axios from "axios";
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

const MyItemList = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const token = localStorage.getItem('token');
    const [itemList, setItemList] = useState<itemList>([]);

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
              setItemList(history);
            } catch (err) {
              setError(err.message || 'Something went wrong');
            } finally {
              setLoading(false);
            }
          };
          fetchHistory();
    }, [token])

    return (
        <Container>
            {itemList.map((item) => (
                <MyItemListItem 
                    key={item.contractId} item={item} imageHeight={100} imageWidth={100} onClick={() => moveDetail(item.contractId)}
                />
            ))}
        </Container>
    );
}

export default MyItemList;