"use client"
import React from "react";
import styled from 'styled-components';
import {useRouter} from "next/navigation";
import ItemPreview from "@/components/ItemPreview";
import Agreement from "@/components/Agreement";
import ExtendedOrangeButton from "@/components/ExtendedOrangeButton";
import { Wrapper, Container, Title, Line, PaymentContainer } from "@/components/ReserveAndPayStyles";
import { useState } from "react";

const SelectContainer = styled.div`
  width: 100%;
  height: 35px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  color: #686868;
  border: 0.5px solid #686868;
  border-radius: 5px;
  select, option {
    font-size: 0.9rem; 
    text-align: center;
    color: #686868;
    width: inherit;
    height: inherit;
    background: transparent;
    border: 0 none;
  }
`;

const Reserve = () => {
  const [checkStatus, setCheckStatus] = useState(false);

  const router = useRouter();

  const handleClick = () => {
    router.push('/reserve/complete');
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
        <Title>대여 예약 상품</Title>
        <ItemPreview item={exampleData} />
        <Line />
        <Title>희망 거래 시간</Title>
        <SelectContainer>
          <select>
            <option key="10분 이내" value={10}>10분 이내</option>
            <option key="20분 이내" value={20}>20분 이내</option>
            <option key="30분 이내" value={30}>30분 이내</option>
            <option key="40분 이내" value={40}>40분 이내</option>
            <option key="50분 이내" value={50}>50분 이내</option>
            <option key="60분 이내" value={60}>60분 이내</option>
          </select>
        </SelectContainer>
        <Line />
        <Agreement checkStatus={checkStatus} setCheckStatus={setCheckStatus} />
        <Line />
        <PaymentContainer>
          <Title>예상 결제 금액</Title>
          <p className="payment">{exampleData.price} P</p>
        </PaymentContainer>
      </Container>
      <ExtendedOrangeButton 
        text = "예약하기" 
        onClick={handleClick} 
        checked={checkStatus}
      />
    </Wrapper>
  );
}

export default Reserve;