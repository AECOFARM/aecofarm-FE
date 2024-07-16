"use client"
import React from "react";
import styled from 'styled-components';
import {useRouter, useParams} from "next/navigation";
import ItemPreview from "@/components/ItemPreview";
import Agreement from "@/components/Agreement";
import ExtendedOrangeButton from "@/components/ExtendedOrangeButton";
import { Wrapper, Container, Title, Line, PaymentContainer } from "@/components/CommonStyles";
import { useEffect, useState } from "react";

const Reserve = () => {
  const { contractId } = useParams();
  const [checkStatus, setCheckStatus] = useState(false);
  const [itemDetail, setItemDetail] = useState<ItemDetail | null>(null);

  const router = useRouter();

  const handleClick = () => {
    router.push('/reserve/complete');
  };

  interface ItemDetail {
    contractId: number;
    itemName: string;
    image: string;
    price: number;
    itemPlace: string;
    time: number;
    contractTime: number;
    itemHash: string[];
  }
  useEffect(() => {
  const fetchItemDetail = async () => {
    // Replace with your API call
    const exampleData: ItemDetail[] = [
      {
        "contractId": 123456,
        "itemName": "맥북 맥세이프 충전기",
        "image": "",
        "price": 0,
        "itemPlace": "경영관",
        "time": 5,
        "contractTime": 10,
        "itemHash": ["eunjeong", "맥북프로", "충전기"],
      },
      {
        "contractId": 789012,
        "itemName": "아이패드 에어 4",
        "image": "/img/item-image.png",
        "price": 5000,
        "itemPlace": "신공학관",
        "time": 3,
        "contractTime": 10,
        "itemHash": ["jeongseon", "네고가능", "상태좋음"],
      },
      {
        "contractId": 789013,
        "itemName": "아이패드 에어 4",
        "image": "/img/item-image.png",
        "price": 5000,
        "itemPlace": "신공학관",
        "time": 3,
        "contractTime": 10,
        "itemHash": ["jeongseon", "네고가능", "상태좋음"],
      },
      {
        "contractId": 789014,
        "itemName": "아이패드 에어 4",
        "image": "/img/item-image.png",
        "price": 0,
        "itemPlace": "신공학관",
        "time": 3,
        "contractTime": 10,
        "itemHash": ["jeongseon", "네고가능", "상태좋음"],
      },
      {
        "contractId": 789015,
        "itemName": "아이패드 에어 4",
        "image": "",
        "price": 0,
        "itemPlace": "신공학관",
        "time": 3,
        "contractTime": 10,
        "itemHash": ["jeongseon", "네고가능", "상태좋음"],
      }
    ];
    const item = exampleData.find((item) => item.contractId === Number(contractId));
    setItemDetail(item || null);
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