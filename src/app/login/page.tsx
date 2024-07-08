'use client'
import styled from 'styled-components';
import AppLayout from "@/components/layout/MobileLayout";
import OrangeButton from '@/components/OrangeButton';
import { useRouter } from 'next/navigation';

const Wrapper = styled.div`
  margin-top: 150px;
  width: 100%; 
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 500px;
`;

const HeaderLogo = styled.img`
  padding: 35px 20px;
`;


const ButtonContainer = styled.div`
  gap: 13px;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 20px;
`;

const Button = styled.input`
  width: 100%;
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
  width: 100%;
  display: flex;
  align-items: center;
`;


const PasswordIcon = styled.img`
  position: absolute;
  right: 15px; 
  width: 23px;
`;

const ExtraButtonContainer = styled.div`
  font-size: 13px;
  display: flex;
  margin-top: 10px;
  color: #757575;
  align-items: right;
  text-align: right;
  justify-content: flex-end;
`;

const SignUpButton = styled.button`
  font-size: 15px;
  margin: 0 5px;
  color: #757575;
  border: 0px;
  background-color: white;
  width: auto;
`;

const SignUpPage = () => {

  const router = useRouter();

  const login = () => {
    router.push('/borrow');
  };
  
  const handleClick = () => {
    router.push('/sign-up');
  };

  const findPassword = () => {
    router.push('/find-password');
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
              <ExtraButtonContainer>
                <SignUpButton onClick={handleClick}>회원가입</SignUpButton> 
                <span> | </span>
                <SignUpButton onClick={findPassword}>비밀번호 찾기</SignUpButton>
            </ExtraButtonContainer>
          </ButtonContainer>
      </Wrapper>
    </AppLayout>
  );
};

export default SignUpPage;
