"use client";
import styled from "styled-components";
import React from "react";
import { Wrapper, Line } from "@/components/CommonStyles";

const BusinessDetailPage = () => {
  return (
    <Wrapper>
      <ClubInfoContainer>
        <ClubProfileContainer>
          <img src="/img/club-image8.png" />
          <p>경영대학 학생회</p>
        </ClubProfileContainer>
        <ClubDescriptionContainer>
          <p>
            동국대학교 경영대학은 글로벌 리더를 양성하기 위해 체계적인 경영
            교육을 제공합니다. 경영대학 학생회는 학우들이 다양한 경영 프로젝트를
            성공적으로 수행할 수 있도록 필요한 장비와 자료를 대여하고 있습니다.
            필요한 물품을 통해 프로젝트를 더욱 효과적으로 진행해보세요.
          </p>
        </ClubDescriptionContainer>
        <Line />
      </ClubInfoContainer>
      <ClubProductsContainer>
        <p>Products</p>
        <ClubProducts>
          <ClubProduct>
            <ClubProductInfo>
              <img src="/img/club/경영대학/구두클리너.jpg" />
              <p>구두 클리너</p>
            </ClubProductInfo>
          </ClubProduct>
          <ClubProduct>
            <ClubProductInfo>
              <img src="/img/club/경영대학/문서집게.jpg" />
              <p>문서 집게</p>
            </ClubProductInfo>
          </ClubProduct>
          <ClubProduct>
            <ClubProductInfo>
              <img src="/img/club/경영대학/발표레이저.jpg" />
              <p>발표 레이저</p>
            </ClubProductInfo>
          </ClubProduct>
          <ClubProduct>
            <ClubProductInfo>
              <img src="/img/club/경영대학/A4용지.jpg" />
              <p>A4 용지</p>
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

export default BusinessDetailPage;
