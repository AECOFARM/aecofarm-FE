import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: auto;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 3px 10px;
  position: relative;
  border-radius: 8px;
  background: #df5532;
`;

const DonateLabelText = styled.p`
  font-size: 0.7rem;
  color: #ffffff;
  font-weight: 700;
  white-space: nowrap;
`;

const DonateLabel = () => {
  return (
    <Container>
      <DonateLabelText>기부</DonateLabelText>
    </Container>
  );
};

export default DonateLabel;
