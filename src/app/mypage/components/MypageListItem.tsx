import styled from 'styled-components';
import { NextPage } from 'next';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  cursor: pointer;
  gap: 10px;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 20px;
  }
`;

const TextContainer = styled.p`
  font-size: 1rem;
  font-weight: 600;
  color: #686868;
`;

interface Props {
  img: string;
  text: string;
  onClick: () => void;
}

const MypageList: NextPage<Props> = ({ img, text, onClick }) => {
  return (
    <Container onClick={onClick}>
      <IconContainer>
          <img src = {img} alt="icon" />
      </IconContainer>
      <TextContainer> {text} </TextContainer>
    </Container>
  )
}

export default MypageList;