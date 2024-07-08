'use client';
import styled from 'styled-components';
import AppLayout from '@/components/layout/MobileLayout';
import Header from '@/components/Header';
import MainLayout from '@/components/layout/MainLayout';
import NoFixedTopBar from '@/components/NoFixedTopBar';
import OrangeButton from '@/components/OrangeButton';

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
    color: #969696;
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
  color: #8E8F90;
  background-color: #F2F2F2;
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

export default function TestPage() {

  const handleClick = () => {

  };

  return (
    <AppLayout>
      <Header/>
        <MainLayout>
          <Wrapper>
            <NoFixedTopBar text='비밀번호 변경'/>
            <TextContainer>
              기존 회원 정보를 입력해주세요! <br/>
              <p>모든 정보가 일치하면 비밀번호를 변경할 수 있어요 </p>
            </TextContainer>
            <ButtonContainer>
              <Button type='text' placeholder="이름"/>
              <Button type='email' placeholder="이메일"/>
              <Button
                type="number"
                placeholder="학번"
                onKeyDown={(e) => {
                  if (e.key === '.' || e.key === '-' || e.key === '+' || e.key === 'e') {
                    e.preventDefault();
                  }
                }}
              /> 
              <PasswordInputContainer>
                  <Button type="password" placeholder="새로운 비밀번호"></Button>
                  <PasswordIcon src="/img/pw-eye.svg" alt="Password Icon" />
              </PasswordInputContainer>
              <OrangeButton text='비밀번호 변경' onClick={handleClick} ></OrangeButton>
            </ButtonContainer>
          </Wrapper>
        </MainLayout>
    </AppLayout>
  );
}
