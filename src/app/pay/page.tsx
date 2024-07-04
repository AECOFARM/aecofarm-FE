"use client"
import React from "react";
import styled from 'styled-components';
import ItemPreview from "@/components/ItemPreview";
import ExtendedOrangeButton from "@/components/ExtendedOrangeButton";
import { Wrapper, Container, Title, Line, PaymentContainer } from "@/components/ReserveAndPayStyles";
import {useRouter} from "next/navigation";
import { useState } from "react";
import Agreement from "@/components/Agreement";

const Pay = () => {
  const [checkStatus, setCheckStatus] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    router.push('/pay/complete');
  };

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
        <ItemPreview item={exampleData} />
        <Line />
        <Agreement checkStatus={checkStatus} setCheckStatus={setCheckStatus} /> 
        <Line />
        <PaymentContainer>
          <Title>총 결제 금액</Title>
          <p className="payment">{exampleData.price} P</p>
        </PaymentContainer>
      </Container>
      <ExtendedOrangeButton 
        text = {`${exampleData.price} P 결제하기`} 
        onClick={handleClick} 
        checked={checkStatus}
        disabled={!checkStatus} 
      />
    </Wrapper>
  );
};

export default Pay;