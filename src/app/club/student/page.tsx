"use client"
import styled from "styled-components"
import React from "react"
import { Wrapper, Line } from "@/components/CommonStyles";

const StudentDetailPage = () => {
  return (
    <Wrapper>
      <ClubInfoContainer>
        <ClubProfileContainer>
          <img src="/img/club-image5.png" />
          <p>동국대학교 총학생회</p>
        </ClubProfileContainer>
        <ClubDescriptionContainer>
          <p>동국대학교 총학생회는 모든 학우들의 목소리를 대변하고 학생들의 복지를 향상시키기 위해 활동합니다. 총학생회는 학우들의 편의를 위해 다양한 물품을 대여하는 사업을 운영하고 있습니다. 여러분의 학업과 일상에 필요한 물품들을 손쉽게 빌려 사용하실 수 있습니다.</p>
        </ClubDescriptionContainer>
        <Line />
      </ClubInfoContainer>
      <ClubProductsContainer>
        <p>Products</p>
        <ClubProducts>
          <ClubProduct>
            <ClubProductInfo>
              <img src = "/img/club/총학생회/노트북거치대.jpg" />
              <p>노트북 거치대</p>
            </ClubProductInfo>
          </ClubProduct>
          <ClubProduct>
            <ClubProductInfo>
              <img src = "/img/club/총학생회/우산.jpg" />
              <p>우산</p>
            </ClubProductInfo>
          </ClubProduct>
          <ClubProduct>
            <ClubProductInfo>
              <img src = "/img/club/총학생회/일회용치약.jpg" />
              <p>일회용 치약</p>
            </ClubProductInfo>
          </ClubProduct>
          <ClubProduct>
            <ClubProductInfo>
              <img src = "/img/club/총학생회/축구공.jpg" />
              <p>축구공</p>
            </ClubProductInfo>
          </ClubProduct>
        </ClubProducts>
      </ClubProductsContainer>
    </Wrapper>
  );
};

const ClubInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 80%;
`;

const ClubProfileContainer = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  img {
    width: 50%;
    aspect-ratio: 1 / 1;
    border-radius: 10px;
  }
  p {
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--black);
  }
`;

const ClubDescriptionContainer = styled.div`
  width: 100%;
  p {
    font-size: 1rem;
    font-weight: 500;
    color: var(--gray6);
    word-break: keep-all
  }
`;

const ClubProductsContainer = styled.div`
  width: 80%;
  margin-top: 20px;
  p {
    font-size: 1.2rem;
    color: var(--black);
    font-weight: 600;
  }
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ClubProducts = styled.div`
  width: 100%;
  gap: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  justify-content: space-between;
`;

const ClubProduct = styled.div`
  width: 48%;
  img {
    height: 80px;
    align-items: center;
  }
  border-radius: 10px;
  border: 1px solid var(--gray6);
  display: flex;
  flex-direction: row;
  padding: 10px;
`;

const ClubProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  p {
    font-size: 1rem;
    color: var(--gray9);
    font-weight: 600;
  }
  margin: 0 auto;
`;

export default StudentDetailPage;