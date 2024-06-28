'use client'
import styled from 'styled-components';
import AppLayout from "@/components/layout/MobileLayout";

const HeadContainer = styled.div`
  position: absolute;
  top: 120px;
  margin-left: 32px;
`;

const IntroHeading = styled.h1`
  font-size: 27px;
  margin-bottom: 10px;
`;

const IntroText = styled.div`
  font-size: 17px;
  margin-bottom: 20px;
  color: #969696;
`;

const ImageContainer = styled.div`

`;

const ImageBackGround = styled.div`
  position: absolute;
  top: 255px;
  margin-left: 25px;
  width: 325px;
  height: 325px;
  background-color: #FFE5BD;
  border-radius: 50%;
  z-index: 0;
`;


const IntroImage = styled.img`
  position: absolute;
  top: 200px;
  width: 100%;
  max-width: 320px;
  height: auto;
  margin-top: 20px;
  z-index: 1;
`;

const ButtonContainer = styled.div`
  position: absolute;
  top: 670px;
  margin-left: 32px;
`;

const Button = styled.button`
  width: 310px;
  padding: 13px;
  border-radius: 10px;
  border: 0px;
  color: white;
  background-color: #FF9B3F;
  font-size: 16px;
`;



const IntroPage = () => {
  return (
    <AppLayout>
      <HeadContainer>
        <IntroHeading>
          대학생을 위한 <br/>   
          또 하나의 보물 창고
        </IntroHeading>
      
        <IntroText>
          아코팜에서 필요한 물품을 <br/>
          함께 공유해보세요!
        </IntroText>
      </HeadContainer>

      <ImageContainer>
        <ImageBackGround/>
        <IntroImage src="/img/intro.svg" alt="Intro" />
      </ImageContainer>
      
      <ButtonContainer>
        <Button>시작하기</Button>
      </ButtonContainer>
    </AppLayout>
  );
};

export default IntroPage;
