import styled from 'styled-components';
import { NextPage } from 'next';
import {useRouter } from "next/navigation";

const PostHeader = styled.div`
  position: sticky;
  height: 50px;
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
        <PostHeader>
            <p>{text}</p>
            <IconContainer onClick={handleBack}>
                <img src = "/back.svg" alt = "back" />
            </IconContainer>
        </PostHeader>
    );
};

export default TopBar;