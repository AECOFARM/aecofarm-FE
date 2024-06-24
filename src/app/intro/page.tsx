"use client";
import styled from 'styled-components';
import AppLayout from "@/components/layout/MobileLayout";


const IntroHeading = styled.h1`
  font-size: 2rem;
  margin-bottom: 10px;
`;

const IntroText = styled.div`
  font-size: 1.2rem;
  margin-bottom: 20px;
`;

const IntroImage = styled.img`
  width: 100%;
  max-width: 400px;
  height: auto;
  margin-top: 20px;
`;

const IntroPage = () => {
  return (
    <AppLayout>
      <IntroHeading>
        대학생을 위한 <br/>   
        또 하나의 보물 창고
      </IntroHeading>
     
      <IntroText>
        아코팜에서 필요한 물품을 <br/>
        함께 공유해보세요!
      </IntroText>
      <IntroImage src="/img/intro.png" alt="Intro" />
    </AppLayout>
  );
};

export default IntroPage;
