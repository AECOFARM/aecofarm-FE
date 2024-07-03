"use client"
import React from "react";
import styled from 'styled-components';
import ItemPreview from "@/components/ItemPreview";
import ExtendedOrangeButton from "@/components/ExtendedOrangeButton";
import {useRouter} from "next/navigation";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 120px;
  margin-bottom: 120px;
  background-color: #ffffff;
`;

const Container = styled.div`
  margin: 0px auto;
  padding: 15px;
  width: 90%;
  height: auto;
  border-radius: 5px;
  border: 0.5px solid #999999;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.p`
  font-size: 1.2rem;
  font-weight: 700;
  color: #000000;
`;
const Line = styled.hr`
  width: 100%;
  height: 0.5px;
  background-color: #999999;
  border: 0; 
`;

const PaymentContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .payment {
    color: #D83752;
    font-size: 1.2rem;
    font-weight: 600;
  }
`;

const Pay = () => {

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
        <PaymentContainer>
          <Title>총 결제 금액</Title>
          <p className="payment">{exampleData.price} P</p>
        </PaymentContainer>
      </Container>
      <ExtendedOrangeButton text = {`${exampleData.price} P 결제하기`} onClick={handleClick} />
    </Wrapper>
  );
};

export default Pay;