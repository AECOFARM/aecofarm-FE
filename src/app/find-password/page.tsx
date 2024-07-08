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
`;

const TextContainer = styled.h3`
  color: black;
  padding: 18px 0 13px;
  font-size: 20px;
  text-align: left;
  font-weight: 700;

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
              <PasswordInputContainer>
                  <Button type="password" placeholder="비밀번호"></Button>
                  <PasswordIcon src="/img/pw-eye.svg" alt="Password Icon" />
              </PasswordInputContainer>
              <Button
                type="number"
                placeholder="학번"
                onKeyDown={(e) => {
                  if (e.key === '.' || e.key === '-' || e.key === '+' || e.key === 'e') {
                    e.preventDefault();
                  }
                }}
              /> 
              <OrangeButton text='비밀번호 변경' onClick={handleClick} ></OrangeButton>
            </ButtonContainer>
          </Wrapper>
        </MainLayout>
    </AppLayout>
  );
}
