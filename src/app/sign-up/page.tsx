'use client'
import styled from 'styled-components';
import AppLayout from "@/components/layout/MobileLayout";
import OrangeButton from '@/components/OrangeButton';
import { useRouter } from 'next/navigation';
import NoFixedTopBar from '@/components/NoFixedTopBar';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 500px;
`;

const Container = styled.div`
  width: 100%; 
  padding: 0 32px; 
  box-sizing: border-box; 
  margin-top: 20px;
`;

const HeaderLogo = styled.img`
  padding-top: 40px;
  padding-bottom: 10px;
`;

const TextContainer = styled.h3`
  color: black;
  padding: 13px 0;
  font-size: 20px;
  text-align: left;
`;

const ProfileContainer = styled.div`
  width: 134px;
  height: 134px;
  background-color: #D9D9D9;
  border-radius: 11px;
`;

const Profile = styled.img`
`;

const ButtonContainer = styled.div`
  position: absolute;
  top: 340px;
  gap: 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 470px;
  padding-right: 40px;
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

const SignUpPage = () => {

  const router = useRouter();

  const handleClick = () => {
    // handle click event
    router.push('/login');
  };

  return (
    <AppLayout>
      <NoFixedTopBar text='회원가입'/>
      <Wrapper>
     
        <Container>
          <TextContainer>프로필 사진을 첨부해주세요</TextContainer>
          <ProfileContainer></ProfileContainer>
        </Container>
        <Container>
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
        </Container>
      </Wrapper>
    </AppLayout>
  );
};

export default SignUpPage;
