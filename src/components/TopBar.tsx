import styled from 'styled-components';
import { NextPage } from 'next';
import {useRouter } from "next/navigation";

const Header = styled.div`
  position: fixed;
  height: 50px;
  top: 60px;
  max-width: 500px;
  width: 100%;
  background-color: #FFFFFF;
  display: flex;
  flex-direction: column;
  justify-content: center;
  p {
    font-size: 1rem;
    font-weight: 700;
    color: #000000;
    text-align: center;
  }
`;

const IconContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  margin-left: 20px;
  img {
    width: 20px;
  }
`;

interface Props {
    text: string;
}

const TopBar: NextPage<Props> = ({ text}) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

    return(
        <Header>
            <p>{text}</p>
            <IconContainer onClick={handleBack}>
                <img src = "/back.svg" alt = "back" />
            </IconContainer>
        </Header>
    );
};

export default TopBar;