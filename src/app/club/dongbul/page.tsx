"use client";
import styled from "styled-components";
import React from "react";
import { Wrapper, Line } from "@/components/CommonStyles";

const AiDetailPage = () => {
  return (
    <Wrapper>
      <ClubInfoContainer>
        <ClubProfileContainer>
          <img src="/img/club-image4.png" />
          <p>동국대학교 불교동아리</p>
        </ClubProfileContainer>
        <ClubDescriptionContainer>
          <span>
            동국대학교 불교 동아리로, 불교의 가르침을 바탕으로 한 다양한 활동을
            진행합니다. 불교에 대한 이해와 신앙을 깊이 있게 쌓아가는 동시에,
            동아리원 간의 유대감을 높이고 다양한 사회 공헌 활동을 통해 사회에
            기여하는 것을 목표로 하고 있습니다.{" "}
          </span>
          <hr />
          <span>
            동아리 회원들을 위해 다양한 물품 대여 시스템을 운영하고 있습니다.
            명상 도구, 불교 서적, 템플 스테이 용품 등 다양한 물품을 대여할 수
            있어, 불교 활동에 필요한 모든 준비를 지원합니다. 언제든 신행 활동에
            필요한 물품을 대여하세요!
          </span>
        </ClubDescriptionContainer>
        <Line />
      </ClubInfoContainer>
      <ClubProductsContainer>
        <p>Products</p>
        <ClubProducts>
          <ClubProduct>
            <ClubProductInfo>
              <img src="/img/club/동불/명상쿠션.jpg" />
              <p>명상 쿠션</p>
            </ClubProductInfo>
          </ClubProduct>
          <ClubProduct>
            <ClubProductInfo>
              <img src="/img/club/동불/명상cd.jpg" />
              <p>명상 cd</p>
            </ClubProductInfo>
          </ClubProduct>
          <ClubProduct>
            <ClubProductInfo>
              <img src="/img/club/동불/불교경전.jpg" />
              <p>불교 경전</p>
            </ClubProductInfo>
          </ClubProduct>
          <ClubProduct>
            <ClubProductInfo>
              <img src="/img/club/동불/향.jpg" />
              <p>향</p>
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
