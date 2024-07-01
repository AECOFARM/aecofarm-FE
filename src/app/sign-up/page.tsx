'use client'
import styled from 'styled-components';
import AppLayout from "@/components/layout/MobileLayout";
import OrangeButton from '@/components/OrangeButton';

const HeaderLogo = styled.img`
  padding: 40px 20px 10px;
  margin-left: 100px;
`;


const TextContainer = styled.h3`
  margin-left: 32px;
  padding: 13px 0;
`;

const ProfileContainer = styled.div`
  margin: 0 32px 20px;
  width: 134px;
  height: 134px;
  background-color: #D9D9D9;
  border-radius: 11px;
`;

const Profile = styled.img`
`;


const ButtonContainer = styled.div`
  position: absolute;
  gap: 18px;
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

const SignUpPage = () => {

  const handleClick = () => {
    
  };

  return (
    <AppLayout>

      <HeaderLogo src="/aecofarm-logo.svg" alt="Intro"></HeaderLogo>

      <TextContainer>프로필 사진을 첨부해주세요</TextContainer>
      <ProfileContainer></ProfileContainer>

      <TextContainer>정보를 입력해주세요</TextContainer>
      <ButtonContainer>
        <Button type='text' placeholder="이름"/>
        <Button type='tel' placeholder="전화번호"/>
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
        <OrangeButton text='등록' onClick={handleClick} ></OrangeButton>
      </ButtonContainer>
     
    </AppLayout>
  );
};

export default SignUpPage;
