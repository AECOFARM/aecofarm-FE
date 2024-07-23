"use client"
import React, { useState, useEffect } from "react";
import Agreement from "@/components/Agreement";
import ItemPreview from "@/components/ItemPreview";
import ExtendedOrangeButton from "@/components/ExtendedOrangeButton";
import { Wrapper, Container, Title, Line, PaymentContainer } from "@/components/CommonStyles";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";

const Pay = () => {
  const { contractId } = useParams();
  const [checkStatus, setCheckStatus] = useState(false);
  const [itemDetail, setItemDetail] = useState<ItemDetail | null>(null);
  const router = useRouter();
  const token = localStorage.getItem('token');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRequest = async () => {
    if (!token) {
      console.error('No token found in localStorage');
      return;
    }
    try {
      const response = await axios.post('/api/contract/pay', 
      { contractId: contractId, point: itemDetail?.price }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.code === 200) {
        router.push('/pay/complete');
      } else {
        alert(response.data.message || '결제에 실패하였습니다.');
      }
    } catch (error) {
      console.error('Failed to request item:', error);
      alert('결제에 실패하였습니다.');
    }
  };

  interface ItemDetail {
    itemName: string;
    image: string;
    price: number;
    itemPlace: string;
    myPoint: number;
    time: number;
    contractTime: number;
    itemHash: string[];
  }

  useEffect(() => {
    const fetchItemDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`/api/contract/get/pay/${contractId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = response.data.data;
        setItemDetail(data);
      } catch (err) {
        const errorMessage = (err as Error).message || 'Something went wrong';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchItemDetail();
  }, [contractId, token]);

  return (
    <Wrapper>
      <Container>
        <Title>대여 상품 확인</Title>
        {itemDetail && <ItemPreview item={itemDetail} />}
        <Line />
        <Agreement checkStatus={checkStatus} setCheckStatus={setCheckStatus} /> 
        <Line />
        <PaymentContainer>
          <Title>총 결제 금액</Title>
          <p className="payment">{itemDetail?.price} P</p>
        </PaymentContainer>
      </Container>
      <ExtendedOrangeButton 
        text={`${itemDetail?.price} P 결제하기`} 
        onClick={handleRequest} 
        checked={checkStatus}
        disabled={!checkStatus} 
      />
    </Wrapper>
  );
};

export default Pay;
