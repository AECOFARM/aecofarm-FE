import React from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import ExtendedOrangeButton from "./ExtendedOrangeButton";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 240px;
  margin-bottom: 120px;
`;

const CompleteMessageContainer = styled.div`
  display: flex;
  margin: 30px;
  flex-direction: column;
  gap: 10px;
  p {
    color: #000000;
    font-size: 1.2rem;
    font-weight: 700;
  }
`;

const IconContainer = styled.div`
  display: flex;
  img {
    width: 30px;
  }
  margin: 0 auto;
`;

interface Props {
    text: string;
}


const GoToMain: React.FC<Props> = ({text}) => {

    const router = useRouter();
  
    const handleClick = () => {
      router.push("/borrow");
    }
  
    return (
      <Wrapper>
        <CompleteMessageContainer>
          <IconContainer>
            <img src = "/complete.svg" alt="complete" />
          </IconContainer>
          <p>{text}</p>
        </CompleteMessageContainer>
        <ExtendedOrangeButton text="메인으로" onClick={handleClick} checked={true} disabled={false}/>
      </Wrapper>
    );
  }
  
  export default GoToMain;