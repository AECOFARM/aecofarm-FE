'use client';
import { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import AppLayout from '@/components/layout/MobileLayout';
import OrangeButton from '@/components/OrangeButton';
import { useRouter } from 'next/navigation';
import { setToken } from '@/utils/localStorage'; // 모듈화된 로컬 스토리지 유틸리티
import { postRequest } from '@/utils/api'; // 모듈화된 API 호출

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
  color: var(--gray6);
  background-color: var(--gray2);
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
  cursor: pointer;
`;

const ExtraButtonContainer = styled.div`
  font-size: 13px;
  display: flex;
  margin-top: 10px;
  color: var(--gray5);
  align-items: right;
  text-align: right;
  justify-content: flex-end;
`;

const SignUpButton = styled.button`
  font-size: 15px;
  margin: 0 5px;
  color: var(--gray5);
  border: 0px;
  background-color: white;
  width: auto;
`;

const SignUpPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const login = async () => {
    try {
      const data = await postRequest('/api/member/login', { email, password });

      if (data.code === 200) {
        const { token } = data.data;
        setToken(token); // 로컬 스토리지에 토큰 저장
        router.push('/borrow');
      } else {
        setErrorMessage(data.message || '로그인에 실패하였습니다. 아이디와 비밀번호를 확인해주세요!');
      }
    } catch (error) {
      setErrorMessage('서버와의 연결에 실패했습니다. 나중에 다시 시도해주세요.');
    }
  };

  const handleClick = () => {
    router.push('/sign-up');
  };

  const findPassword = () => {
    router.push('/find-password');
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prevVisibility => !prevVisibility);
  };

  return (
    <AppLayout>
      <Wrapper>
        <HeaderLogo src='/img/aeco-logo.svg' alt="Logo" />
        <ButtonContainer>
          <Button 
            type="email" 
            placeholder="이메일" 
            value={email} 
            onChange={handleEmailChange} 
          />
          <PasswordInputContainer>
            <Button 
              type={isPasswordVisible ? 'text' : 'password'} 
              placeholder="비밀번호" 
              value={password} 
              onChange={handlePasswordChange} 
            />
            <PasswordIcon 
              src={isPasswordVisible ? '/img/pw-eye-open.svg' : '/img/pw-eye.svg'} 
              alt="Password Icon" 
              onClick={togglePasswordVisibility} 
            />
          </PasswordInputContainer>
          {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
          <OrangeButton text='로그인' onClick={login} />
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
