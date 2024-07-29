"use client"
import styled from "styled-components"
import React from "react"
import { Wrapper, Line } from "@/components/CommonStyles";

const EducationDetailPage = () => {
  return (
    <Wrapper>
      <ClubInfoContainer>
        <ClubProfileContainer>
          <img src="/img/club-image6.png" />
          <p>사범대학 학생회</p>
        </ClubProfileContainer>
        <ClubDescriptionContainer>
          <p>동국대학교 사범대학은 미래의 교육자를 양성하는 데 중점을 둡니다. 교육학의 이론과 실습을 겸비한 교육 과정을 통해 학생들이 훌륭한 교사로 성장할 수 있도록 지원합니다. 다양한 교구와 실습 자료를 대여하여 보다 효과적인 교육 연습이 가능합니다.</p>
        </ClubDescriptionContainer>
        <Line />
      </ClubInfoContainer>
      <ClubProductsContainer>
        <p>Products</p>
        <ClubProducts>
          <ClubProduct>
            <ClubProductInfo>
              <img src = "/img/club/사범대학/색연필.jpg" />
              <p>색연필</p>
            </ClubProductInfo>
          </ClubProduct>
          <ClubProduct>
            <ClubProductInfo>
              <img src = "/img/club/사범대학/색종이.jpg" />
              <p>색종이</p>
            </ClubProductInfo>
          </ClubProduct>
          <ClubProduct>
            <ClubProductInfo>
              <img src = "/img/club/사범대학/싸인펜.jpg" />
              <p>싸인펜</p>
            </ClubProductInfo>
          </ClubProduct>
          <ClubProduct>
            <ClubProductInfo>
              <img src = "/img/club/사범대학/중등교과서.jpg" />
              <p>중등 교과서</p>
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

export default EducationDetailPage;