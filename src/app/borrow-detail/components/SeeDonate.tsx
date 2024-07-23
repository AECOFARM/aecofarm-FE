import React, { useState } from 'react';
import styled from 'styled-components';

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

const SeeDonate: React.FC = () => {
  const [seeDonateStatus, setSeeDonateStatus] = useState(false);

  const SeeDonateSrc = seeDonateStatus ? '/img/not-checked.svg' : '/img/donate-check.svg';

  const checkSeeDonateStatus = () => {
    setSeeDonateStatus(prevStatus => !prevStatus);
  };

  return (
    <DonateContainer onClick={checkSeeDonateStatus}>
      <CheckDonateButton>기부 모아보기</CheckDonateButton>
      <CheckIcon src={SeeDonateSrc} alt='check' />
    </DonateContainer>
  );
};

export default SeeDonate;
