"use client";
import styled from "styled-components";
import React from "react";
import { Wrapper, Line } from "@/components/CommonStyles";

const AiDetailPage = () => {
  return (
    <Wrapper>
      <ClubInfoContainer>
        <ClubProfileContainer>
          <img src="/img/club-image2.png" />
          <p>공과대학 학생회</p>
        </ClubProfileContainer>
        <ClubDescriptionContainer>
          <p>
            동국대학교 공과대학은 혁신적인 공학 교육과 실습을 통해 창의적이고
            실용적인 인재를 양성합니다. 공과대학 학생회는 학생들의 학습 효율을
            높이기 위해 다양한 공학 기기 및 도구를 대여해드리고 있습니다.
            여러분의 학업에 필요한 물품들을 쉽게 대여하여 사용하실 수 있습니다.
          </p>
        </ClubDescriptionContainer>
        <Line />
      </ClubInfoContainer>
      <ClubProductsContainer>
        <p>Products</p>
        <ClubProducts>
          <ClubProduct>
            <ClubProductInfo>
              <img src="/img/club/공과대학/공구키트.jpg" />
              <p>공구 키트</p>
            </ClubProductInfo>
          </ClubProduct>
          <ClubProduct>
            <ClubProductInfo>
              <img src="/img/club/공과대학/글루건.jpg" />
              <p>글루건</p>
            </ClubProductInfo>
          </ClubProduct>
          <ClubProduct>
            <ClubProductInfo>
              <img src="/img/club/공과대학/아두이노키트.jpg" />
              <p>아두이노 키트</p>
            </ClubProductInfo>
          </ClubProduct>
          <ClubProduct>
            <ClubProductInfo>
              <img src="/img/club/공과대학/일반물리학실험책.jpg" />
              <p>일반물리학 실험책</p>
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

export default AiDetailPage;
