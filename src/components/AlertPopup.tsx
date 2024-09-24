import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
`;

const BoxContainer = styled.div`
  width: 80%;
  max-width: 400px;
  border-radius: 15px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 30px;
  gap: 10px;
`;

const Title = styled.p`
  font-size: 1.3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.black};
`;

const Content = styled.p`
  font-size: 1.1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray7};
  word-break: keep-all;
`;

const CloseButton = styled.div`
  margin: 0 auto;
  padding: 8px 30px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.orange2};
  p {
    font-size: 1rem;
    font-weight: 600;
  }
`;

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  button: string;
}

const AlertPopup: React.FC<PopupProps> = ({
  isOpen,
  onClose,
  title,
  content,
  button,
}) => {
  if (!isOpen) return null;

  return (
    <Container>
      <BoxContainer>
        <Title>{title}</Title>
        <Content>{content}</Content>
        <CloseButton onClick={onClose}>
          <p>{button}</p>
        </CloseButton>
      </BoxContainer>
    </Container>
  );
};

export default AlertPopup;
