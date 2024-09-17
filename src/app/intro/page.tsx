"use client";
import styled from "styled-components";
import AppLayout from "@/components/layout/MobileLayout";
import OrangeButton from "@/components/OrangeButton";
import { useRouter } from "next/navigation";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 400px;
`;

const HeadContainer = styled.div`
  margin-top: 100px;
`;

const IntroHeading = styled.h1`
  font-size: 32px;
  margin-bottom: 10px;
  color: black;
`;

const IntroText = styled.div`
  font-size: 17px;
  margin-bottom: 20px;
  color: var(--gray5);
`;

const ImageContainer = styled.div``;

const ImageBackGround = styled.div`
  width: 330px;
  height: 330px;
  background-color: ${({ theme }) => theme.colors.orange0};
  border-radius: 50%;
  z-index: 0;
`;

const IntroImage = styled.img`
  position: absolute;
  top: 200px;
  width: 100%;
  max-width: 330px;
  margin-top: 20px;
  z-index: 1;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  top: 670px;
  z-index: 2;
  width: 90%;
  max-width: 450px;
`;

const IntroPage = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/login");
  };

  return (
    <AppLayout>
      <Wrapper>
        <HeadContainer>
          <IntroHeading>
            대학생을 위한 <br />또 하나의 보물 창고
          </IntroHeading>

          <IntroText>
            아코팜에서 필요한 물품을 <br />
            함께 공유해보세요!
          </IntroText>
        </HeadContainer>

        <ImageContainer>
          <ImageBackGround />
          <IntroImage src="/img/intro.svg" alt="Intro" />
        </ImageContainer>

        <ButtonContainer>
          <OrangeButton
            width={320}
            padding={13}
            text="시작하기"
            onClick={handleClick}
          />
        </ButtonContainer>
      </Wrapper>
    </AppLayout>
  );
};

export default IntroPage;
