'use client'
import styled from 'styled-components';
import AppLayout from "@/components/layout/MobileLayout";
import OrangeButton from '@/components/OrangeButton';
import { useRouter } from 'next/navigation';

const HeaderLogo = styled.img`
  padding: 35px 20px;
  margin-left: 100px;
`;

const TitleText = styled.h2`
  margin-left: 32px;
  margin-bottom: 15px;
`;

const TextContainer = styled.h3`
  margin-left: 32px;
  padding: 10px 0;
`;

const ProfileContainer = styled.div`
  margin: 0 32px 25px;
  width: 150px;
  height: 150px;
  background-color: #D9D9D9;
  border-radius: 11px;
`;

const Profile = styled.image`
`;


const ButtonContainer = styled.div`
  position: absolute;
  gap: 18px;
  margin-left: 32px;
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  width: 310px;
  padding: 13px;
  border-radius: 15px;
  border: 0px;
  color: #8E8F90;
  background-color: #F2F2F2;
  font-size: 16px;
`;

const SignUpPage = () => {

  const handleClick = () => {
    router.push('/sign-up');
  };

  return (
    <AppLayout>

      <HeaderLogo src="/img/aecofarm-logo.svg" alt="Intro"></HeaderLogo>

      <TitleText>회원가입</TitleText>

      <TextContainer>프로필 사진을 첨부해주세요</TextContainer>
      <ProfileContainer></ProfileContainer>

      <TextContainer>정보를 입력해주세요</TextContainer>
      <ButtonContainer>
        <Button> 이름 </Button>
        <Button> 전화번호 </Button>
        <Button> 주소 </Button>
        <Button> 학번 </Button>
        <OrangeButton text='등록' onClick={handleClick} ></OrangeButton>
      </ButtonContainer>
    </AppLayout>
  );
};

export default SignUpPage;
