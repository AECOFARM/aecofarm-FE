"use client"
import React from "react";
import styled from 'styled-components';
import ItemPreview from "@/components/ItemPreview";
import ExtendedOrangeButton from "@/components/ExtendedOrangeButton";
import { Wrapper, Container, Title, Line, PaymentContainer } from "@/components/CommonStyles";
import {useRouter} from "next/navigation";
import { useState, useEffect } from "react";
import Agreement from "@/components/Agreement";
import { useParams } from "react-router-dom";

const Pay = () => {
  const {contractId} = useParams();
  const [checkStatus, setCheckStatus] = useState(false);
  const [itemDetail, setItemDetail] = useState<ItemDetail | null>(null);
  const router = useRouter();

  const handleClick = () => {
    router.push('/pay/complete');
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
          "contractId": 1234,
          "itemName": "맥북 맥세이프 충전기",
          "image": "",
          "price": 0,
          "itemPlace": "경영관",
          "time": 5,
          "contractTime": 10,
          "itemHash": ["eunjeong", "맥북프로", "충전기"],
        },
        {
          "contractId": 1235,
          "itemName": "아이패드 에어 4",
          "image": "/img/item-image.png",
          "price": 5000,
          "itemPlace": "신공학관",
          "time": 3,
          "contractTime": 10,
          "itemHash": ["jeongseon", "네고가능", "상태좋음"],
        },
        {
          "contractId": 1236,
          "itemName": "아이패드 에어 4",
          "image": "/img/item-image.png",
          "price": 5000,
          "itemPlace": "신공학관",
          "time": 3,
          "contractTime": 10,
          "itemHash": ["jeongseon", "네고가능", "상태좋음"],
        },
        {
          "contractId": 1237,
          "itemName": "아이패드 에어 4",
          "image": "/img/item-image.png",
          "price": 0,
          "itemPlace": "신공학관",
          "time": 3,
          "contractTime": 10,
          "itemHash": ["jeongseon", "네고가능", "상태좋음"],
        },
        {
          "contractId": 1238,
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


  const exampleData = {
    itemName : "초고속 멀티 충전기",
    image : "/img/item-image.png",
    price : 3000,
    itemPlace : "신공학관",
    time : 3,
    contractTime : 10,
    itemHash : ["haeun", "상태최상", "아이폰", "갤럭시"],
  };

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
        text = {`${itemDetail?.price} P 결제하기`} 
        onClick={handleClick} 
        checked={checkStatus}
        disabled={!checkStatus} 
      />
    </Wrapper>
  );
};

export default Pay;