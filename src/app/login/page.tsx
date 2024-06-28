'use client'
import styled from 'styled-components';
import AppLayout from "@/components/layout/MobileLayout";
import OrangeButton from '@/components/OrangeButton';
import { useRouter } from 'next/navigation';

const Wrapper = styled.div`
  margin-top: 150px;
`;

const HeaderLogo = styled.img`
  padding: 35px 20px;
  margin-left: 100px;
`;


const ButtonContainer = styled.div`
  gap: 13px;
  margin-left: 32px;
  display: flex;
  flex-direction: column;
`;

const Button = styled.input`
  width: 310px;
  padding: 13px 22px;
  border-radius: 15px;
  border: 0px;
  color: #8E8F90;
  background-color: #F2F2F2;
  font-size: 16px;
  text-align: left;
`;


const PasswordInputContainer = styled.div`
  position: relative;
  width: 310px;
  display: flex;
  align-items: center;
`;


const PasswordIcon = styled.img`
  position: absolute;
  right: 15px; 
  width: 23px;
`;

const ExtraButtonContainer = styled.div`
  font-size: 12px;
  display: flex;
  width: 300px;
  margin-left: 200px;
  margin-top: 10px;
  color: #757575;
`;

const SignUpButton = styled.button`
  margin: 0 5px;
  color: #757575;
  border: 0px;
  background-color: white;
  width: auto;
`;

const SignUpPage = () => {

  const router = useRouter();

  const login = () => {
    router.push('/sign-up');
  };
  
  const handleClick = () => {
    router.push('/sign-up');
  };

  return (
    <AppLayout>
      <Wrapper>
        <HeaderLogo src='/img/aeco-logo.svg'></HeaderLogo>
        <ButtonContainer>
          <Button type="email" placeholder="이메일"></Button>
          <PasswordInputContainer>
            <Button type="password" placeholder="비밀번호"></Button>
            <PasswordIcon src="/img/pw-eye.svg" alt="Password Icon" />
          </PasswordInputContainer>
          <OrangeButton text='로그인' onClick={login}></OrangeButton>
        </ButtonContainer>
        <ExtraButtonContainer>
          <SignUpButton onClick={handleClick}>회원가입</SignUpButton> 
          <span> | </span>
          <SignUpButton>비밀번호 찾기</SignUpButton>
        </ExtraButtonContainer>
      </Wrapper>
    </AppLayout>
  );
};

export default SignUpPage;
