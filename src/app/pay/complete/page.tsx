'use client'
import React from "react"
import styled from "styled-components"
import ExtendedOrangeButton from "@/components/ExtendedOrangeButton";
import {useRouter} from "next/navigation";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 240px;
  margin-bottom: 120px;
  background-color: #ffffff;
`;

const CompleteMessageContainer = styled.div`
  display: flex;
  margin: 30px;
  flex-direction: column;
  gap: 10px;
  p {
    color: #000000;
    font-size: 1.2rem;
    font-weight: 700;
  }
`;

const IconContainer = styled.div`
  display: flex;
  img {
    width: 30px;
  }
  margin: 0 auto;
`;

const PayComplete = () => {

  const router = useRouter();

  const handleClick = () => {
    router.push("/lend");
  }

  return (
    <Wrapper>
      <CompleteMessageContainer>
        <IconContainer>
          <img src = "/complete.svg" alt="complete" />
        </IconContainer>
        <p>결제가 완료되었습니다.</p>
      </CompleteMessageContainer>
      <ExtendedOrangeButton text="메인으로" onClick={handleClick} />
    </Wrapper>
  );
}

export default PayComplete;