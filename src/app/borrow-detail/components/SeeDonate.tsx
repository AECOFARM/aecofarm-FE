import React, { useState } from 'react';
import styled from 'styled-components';

// 스타일 정의
const DonateContainer = styled.div`
  margin-left: 20px;
  width: 150px;
  display: flex;
`;

const CheckDonateButton = styled.button`
  margin: 0 5px;
  color: black;
  border: 0px;
  background-color: white;
  font-size: 16px;
`;

const CheckIcon = styled.img`
  width: 30px;
  right: 10px;
  top: 50%;
  padding: 0 2px;
`;

// Prop 타입 정의
interface SeeDonateProps {
  setSeeDonateStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

const SeeDonate: React.FC<SeeDonateProps> = ({ setSeeDonateStatus }) => {
  // 로컬 상태 정의
  const [seeDonateStatus, setLocalSeeDonateStatus] = useState<boolean>(false);

  // 이미지 소스 결정
  const SeeDonateSrc = seeDonateStatus ? '/img/not-checked.svg' : '/img/donate-check.svg';

  // 상태를 토글하는 함수
  const checkSeeDonateStatus = () => {
    setLocalSeeDonateStatus(prevStatus => !prevStatus);
    setSeeDonateStatus(prevStatus => !prevStatus); // 부모 컴포넌트의 상태 업데이트
  };

  return (
    <DonateContainer onClick={checkSeeDonateStatus}>
      <CheckDonateButton>기부 모아보기</CheckDonateButton>
      <CheckIcon src={SeeDonateSrc} alt='check' />
    </DonateContainer>
  );
};

export default SeeDonate;
