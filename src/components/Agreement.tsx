import styled from "styled-components";
import React from "react";
import { useState } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-items: center;
  p {
    font-size: 1.1rem;
    font-weight: 500;
    color: #000000;
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 25px;
    height: 25px;
  }
`;

const ContentListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const ContentContainer = styled.div`
  width: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-left: 4px;
  gap: 10px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  p {
    color: ${({ theme }) => theme.colors.gray5};
    font-size: 0.9rem;
  }
  img {
    width: 18px;
  }
`;

const MoreButton = styled.p`
  color: #000000;
  font-size: 0.8rem;
  cursor: pointer;
  &:hover {
    text-decoration: underline #000000;
  }
`;

interface AgreementProps {
  checkStatus: boolean;
  setCheckStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

const Agreement: React.FC<AgreementProps> = ({
  checkStatus,
  setCheckStatus,
}) => {
  const checkIconSrc = checkStatus
    ? "/img/checked.svg"
    : "/img/not-checked.svg";
  const childCheckIconSrc = checkStatus
    ? "/simple-checked.svg"
    : "/simple-not-checked.svg";

  const toggleCheckStatus = () => {
    setCheckStatus((prevStatus) => !prevStatus);
  };

  return (
    <Container>
      <Title>
        <IconContainer>
          <img
            src={checkIconSrc}
            onClick={toggleCheckStatus}
            alt="check icon"
          />
        </IconContainer>
        <p>예약 내용 확인 및 동의</p>
      </Title>
      <ContentListContainer>
        <ContentContainer>
          <Content>
            <img src={childCheckIconSrc} />
            <p>물품 대여 시 유의사항 안내</p>
          </Content>
          <MoreButton>자세히 보기</MoreButton>
        </ContentContainer>
        <ContentContainer>
          <Content>
            <img src={childCheckIconSrc} />
            <p>개인정보 제공 동의</p>
          </Content>
          <MoreButton>자세히 보기</MoreButton>
        </ContentContainer>
        <ContentContainer>
          <Content>
            <img src={childCheckIconSrc} />
            <p>서비스 이용약관 동의</p>
          </Content>
          <MoreButton>자세히 보기</MoreButton>
        </ContentContainer>
      </ContentListContainer>
    </Container>
  );
};

export default Agreement;
