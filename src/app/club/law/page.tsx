"use client";
import styled from "styled-components";
import React from "react";
import { Wrapper, Line } from "@/components/CommonStyles";

const LawDetailPage = () => {
  return (
    <Wrapper>
      <ClubInfoContainer>
        <ClubProfileContainer>
          <img src="/img/club-image7.png" />
          <p>법과대학 학생회</p>
        </ClubProfileContainer>
        <ClubDescriptionContainer>
          <p>
            동국대학교 법과대학은 법률 전문가를 양성하기 위해 철저한 법학 교육을
            실시합니다. 법과대학 학생회는 학우들이 다양한 법학 과제를 수행할 수
            있도록 법률 서적과 참고 자료를 대여하고 있습니다. 필요한 물품을 통해
            학업을 더욱 효과적으로 진행하세요.
          </p>
        </ClubDescriptionContainer>
        <Line />
      </ClubInfoContainer>
      <ClubProductsContainer>
        <p>Products</p>
        <ClubProducts>
          <ClubProduct>
            <ClubProductInfo>
              <img src="/img/club/법과대학/법학개론.jpg" />
              <p>법학개론</p>
            </ClubProductInfo>
          </ClubProduct>
          <ClubProduct>
            <ClubProductInfo>
              <img src="/img/club/법과대학/샤프.jpg" />
              <p>샤프</p>
            </ClubProductInfo>
          </ClubProduct>
          <ClubProduct>
            <ClubProductInfo>
              <img src="/img/club/법과대학/판례집.jpg" />
              <p>판례집</p>
            </ClubProductInfo>
          </ClubProduct>
          <ClubProduct>
            <ClubProductInfo>
              <img src="/img/club/법과대학/포스트잇.jpg" />
              <p>포스트잇</p>
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
    word-break: keep-all;
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

export default LawDetailPage;
