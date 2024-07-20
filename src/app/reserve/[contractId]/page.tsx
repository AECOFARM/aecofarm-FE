"use client"
import React from "react";
import styled from 'styled-components';
import {useRouter, useParams} from "next/navigation";
import ItemPreview from "@/components/ItemPreview";
import Agreement from "@/components/Agreement";
import ExtendedOrangeButton from "@/components/ExtendedOrangeButton";
import { Wrapper, Container, Title, Line, PaymentContainer } from "@/components/CommonStyles";
import { useEffect, useState } from "react";
import axios from "axios";

const Reserve = () => {
  const { contractId } = useParams();
  const [checkStatus, setCheckStatus] = useState(false);
  const [itemDetail, setItemDetail] = useState<ItemDetail>();
  const token = localStorage.getItem('token');
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = () => {
    router.push('/reserve/complete');
  };

  interface ItemDetail {
    itemName: string;
    image: string;
    price: number;
    itemPlace: string;
    time: number;
    contractTime: number;
    itemHash: string[];
  }

  useEffect(() => {
    const fetchItemDetail = async() => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`/api/contract/get/reserve/${contractId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = response.data.data;
        setItemDetail(data);
      } catch(err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchItemDetail();
  }, [contractId]);

  return (
    <Wrapper>
      <Container>
        <Title>대여 예약 상품</Title>
        {itemDetail && <ItemPreview item={itemDetail} />}
        <Line />
        <Agreement checkStatus={checkStatus} setCheckStatus={setCheckStatus} />
        <Line />
        <PaymentContainer>
          <Title>예상 결제 금액</Title>
          <p className="payment">{itemDetail?.price} P</p>
        </PaymentContainer>
      </Container>
      <ExtendedOrangeButton 
        text = "예약하기" 
        onClick={handleClick} 
        checked={checkStatus}
        disabled={!checkStatus} 
      />
    </Wrapper>
  );
}

export default Reserve;