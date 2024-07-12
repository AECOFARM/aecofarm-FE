'use client';
import React, { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import AppLayout from '@/components/layout/MobileLayout';
import Header from '@/components/Header';
import MainLayout from '@/components/layout/MainLayout';
import NoFixedTopBar from '@/components/NoFixedTopBar';
import OrangeButton from '@/components/OrangeButton';

// 환경 변수로부터 API baseURL 가져오기
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
console.log("API Base URL:", API_BASE_URL);

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 500px;
`;

const TextContainer = styled.h3`
  color: black;
  padding: 18px 45px 15px;
  font-size: 20px;
  text-align: left;
  font-weight: 700;
  width: 100%;

  p {
    font-size: 15px;
    font-weight: 500;
    color: var(--gray6);
    padding: 4px 0;
  }
`;

const ButtonContainer = styled.div`
  gap: 23px;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 40px;
`;

const Button = styled.input`
  padding: 18px 22px;
  border-radius: 15px;
  border: 0px;
  color: var(--gray6);
  background-color: var(--gray2);
  font-size: 17px;
  text-align: left;
  width: 100%;
`;

const PasswordInputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 500px;
`;

const PasswordIcon = styled.img`
  position: absolute;
  right: 15px;
  width: 23px;
`;

const FindPassword: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [schoolNum, setSchoolNum] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleClick = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/member/update/pw`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          userName,
          schoolNum: Number(schoolNum),
          password,
        }),
      });

      const data = await response.json();
      if (data.code === 200) {
        alert(data.message);
      } else {
        alert(data.data);
      }
    } catch (error) {
      console.error('Error occurred while updating password:', error);
      alert('비밀번호 변경에 실패하였습니다.');
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    switch (name) {
      case 'userName':
        setUserName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'schoolNum':
        // 학번 입력 시 숫자만 허용
        if (/^\d+$/.test(value) || value === '') {
          setSchoolNum(value);
        }
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
  };

  return (
    <AppLayout>
      <Header />
      <MainLayout>
        <Wrapper>
          <NoFixedTopBar text='비밀번호 변경' />
          <TextContainer>
            기존 회원 정보를 입력해주세요! <br />
            <p>모든 정보가 일치하면 비밀번호를 변경할 수 있어요 </p>
          </TextContainer>
          <ButtonContainer>
            <Button
              type='text'
              placeholder='이름'
              name='userName'
              value={userName}
              onChange={handleInputChange}
            />
            <Button
              type='email'
              placeholder='이메일'
              name='email'
              value={email}
              onChange={handleInputChange}
            />
            <Button
              type='text'
              placeholder='학번'
              name='schoolNum'
              value={schoolNum}
              onChange={handleInputChange}
            />
            <PasswordInputContainer>
              <Button
                type='password'
                placeholder='새로운 비밀번호'
                name='password'
                value={password}
                onChange={handleInputChange}
              />
              <PasswordIcon src='/img/pw-eye.svg' alt='Password Icon' />
            </PasswordInputContainer>
            <OrangeButton text='비밀번호 변경' onClick={handleClick} />
          </ButtonContainer>
        </Wrapper>
      </MainLayout>
    </AppLayout>
  );
};

export default FindPassword;
