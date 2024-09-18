import React, { useState } from "react";
import styled from "styled-components";

const DonateContainer = styled.div`
  margin-left: 20px;
  width: 150px;
  display: flex;
  align-items: center; /* align items to center vertically */
  cursor: pointer; /* show a pointer cursor to indicate it's clickable */
`;

const CheckDonateButton = styled.button`
  margin: 0 5px;
  color: black;
  border: 0;
  background-color: white;
  font-size: 16px;
  cursor: pointer; /* show a pointer cursor to indicate it's clickable */
`;

const CheckIcon = styled.img`
  width: 30px;
  right: 10px;
  top: 50%;
  padding: 0 2px;
  position: absolute; /* position icon correctly within container */
`;

interface SeeDonateProps {
  setSeeDonateStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

const SeeDonate: React.FC<SeeDonateProps> = ({ setSeeDonateStatus }) => {
  const [seeDonateStatus, setLocalSeeDonateStatus] = useState<boolean>(false);

  const SeeDonateSrc = seeDonateStatus
    ? "/img/donate-check.svg"
    : "/img/not-checked.svg";

  const checkSeeDonateStatus = (): void => {
    setLocalSeeDonateStatus((prevStatus) => !prevStatus);
    setSeeDonateStatus((prevStatus) => !prevStatus); // Update parent state
  };

  return (
    <DonateContainer onClick={checkSeeDonateStatus}>
      <CheckDonateButton>기부 모아보기</CheckDonateButton>
      <CheckIcon src={SeeDonateSrc} alt="check" />
    </DonateContainer>
  );
};

export default SeeDonate;
