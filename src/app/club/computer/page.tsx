"use client";
import styled from "styled-components";
import React from "react";
import { Wrapper, Line } from "@/components/CommonStyles";

const AiDetailPage = () => {
  return (
    <Wrapper>
      <ClubInfoContainer>
        <ClubProfileContainer>
          <img src="/img/club-image3.png" />
          <p>컴퓨터공학전공 학생회</p>
        </ClubProfileContainer>
        <ClubDescriptionContainer>
          <p>
            동국대학교 컴퓨터공학전공은 정보화 사회에 발맞추어 창의적이고
            실용적인 소프트웨어 및 하드웨어 전문가를 양성합니다. 학생들이 다양한
            프로젝트를 수행할 수 있도록 최신 컴퓨터 장비와 소프트웨어를
            대여해드리고 있습니다. 필요한 물품을 손쉽게 빌려 사용해보세요.
          </p>
        </ClubDescriptionContainer>
        <Line />
      </ClubInfoContainer>
      <ClubProductsContainer>
        <p>Products</p>
        <ClubProducts>
          <ClubProduct>
            <ClubProductInfo>
              <img src="/img/club/컴퓨터공학/무선마우스.jpg" />
              <p>무선 마우스</p>
            </ClubProductInfo>
          </ClubProduct>
          <ClubProduct>
            <ClubProductInfo>
              <img src="/img/club/컴퓨터공학/무선키보드.jpg" />
              <p>무선 키보드</p>
            </ClubProductInfo>
          </ClubProduct>
          <ClubProduct>
            <ClubProductInfo>
              <img src="/img/club/컴퓨터공학/외장하드.jpg" />
              <p>외장하드</p>
            </ClubProductInfo>
          </ClubProduct>
          <ClubProduct>
            <ClubProductInfo>
              <img src="/img/club/컴퓨터공학/usb허브.jpg" />
              <p>usb 허브</p>
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
    color: ${({ theme }) => theme.colors.black};
  }
`;

const ClubDescriptionContainer = styled.div`
  width: 100%;
  p {
    font-size: 1rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.gray6};
    word-break: keep-all;
  }
`;

const ClubProductsContainer = styled.div`
  width: 80%;
  margin-top: 20px;
  p {
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.black};
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
  border: 1px solid ${({ theme }) => theme.colors.gray6};
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
    color: ${({ theme }) => theme.colors.gray9};
    font-weight: 600;
  }
  margin: 0 auto;
`;

export default AiDetailPage;
