import React from 'react';
import styled from 'styled-components';
import MintButton from './MintButton';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  button1: string;
  button2: string;
  isTrue: () => void;
}

const Overlay = styled.div`
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

const Content = styled.div`
  text-align: center;
  background: white;
  padding: 30px;
  border-radius: 15px;
  width: 90%;
  max-width: 400px;
  margin: 0 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 
              0 6px 20px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 22px;
  color: var(--black);
`;

const Line = styled.div`
  background-color: var(--gray8);
  width 40px;
`;

const Detail = styled.div`
  margin: 10px;
  font-size: 17px;
  color: var(--black);
`;

const ButtonContainer = styled.div`
  padding: 10px;
`;

const CloseButton = styled.button`
  width: 100%;
  padding: 13px;
  border-radius: 30px;
  border: 1px solid var(--mint);
  color: var(--gray6);
  background-color: white;
  font-size: 16px;
  margin-top: 10px;
  font-weight: 600;
`;

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, title, children, button1, button2, isTrue }) => {
  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <Content onClick={(e) => e.stopPropagation()}>
        <Line />
        <Title>{title}</Title>
        <Detail>{children}</Detail>
        <ButtonContainer>
          <MintButton text={button1} onClick={isTrue} />
          <CloseButton onClick={onClose}>{button2}</CloseButton> 
        </ButtonContainer>
      </Content>
    </Overlay>
  );
};

export default Popup;
