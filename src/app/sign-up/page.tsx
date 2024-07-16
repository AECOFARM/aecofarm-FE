'use client'
import styled from 'styled-components';
import AppLayout from "@/components/layout/MobileLayout";
import OrangeButton from '@/components/OrangeButton';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import NoFixedTopBar from '@/components/NoFixedTopBar';
import Popup from '@/components/Popup';
import axios from 'axios';
import FormData from 'form-data';

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

const TextContainer = styled.h3`
  color: black;
  padding: 15px 0;
  font-size: 22px;
  text-align: left;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
`;

const HiddenProfileInput = styled.input`
  display: none;
`;

const CustomProfileInputLabel = styled.label`
  width: 100%;
  height: 50px;
  background: #fff;
  border-radius: 24px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 80px 10px 15px 10px;
  border: 1px solid var(--gray3);
  color: var(--orange2);
  font-size: 17px;

  &:hover {
    background: var(--orange2);
    color: #fff;   
    border: none;
  }
`;

const DefaultProfile = styled.div`
  width: 200px;
  height: 200px;
  background-color: var(--gray3);
  border-radius: 11px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 11px;
  object-fit: cover;
`;

const DeleteImage = styled.div`
  width: 100%;
  height: 50px;
  background: #fff;
  border-radius: 24px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 10px;
  border: 1px solid var(--gray3);
  color: var(--orange2);
  font-size: 16px;

  &:hover {
    background: var(--orange2);
    color: #fff;   
    border: none;
  }
`;

const ButtonContainer = styled.div`
  position: absolute;
  top: 420px;
  gap: 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 470px;
  padding-right: 40px;
`;

const Button = styled.input`
  width: 100%;
  padding: 15px 22px;
  border-radius: 15px;
  border: 0px;
  color: var(--gray6);
  background-color: var(--gray2);
  font-size: 17px;
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
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [userData, setUserData] = useState({
    email: '',
    userName: '',
    password: '',
    phone: '',
    schoolNum: ''
  });
  const [profileImage, setProfileImage] = useState(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  console.log("API Base URL:", API_BASE_URL);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);

  const handleSignUp = async () => {
    const formData = new FormData();
    
    if (profileImage) {
      formData.append('file', profileImage, profileImage.name);
    }
  
    // signupData를 JSON 문자열로 변환하여 FormData에 추가
    formData.append('signupData', JSON.stringify(userData));
    
    console.log('FormData content:');
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`);
    }
  
    try {
      const response = await axios.post('https://port-0-aecofarm-lyhj20nc49bb1c32.sel5.cloudtype.app/member/signup', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.data.code === 200) {
        // 회원가입 성공 후 팝업 표시
        handleOpenPopup();
      } else {
        console.log('서버 응답:', response.data);
        alert('회원가입에 실패하였습니다.');
      }
    } catch (error) {
      if (error.response) {
        // 서버가 응답을 반환했지만 2xx 범위에 있지 않은 경우
        console.error('회원가입 오류:', error.response.data);
        alert(`회원가입에 실패하였습니다: ${error.response.data.message}`);
      } else if (error.request) {
        // 요청이 만들어졌으나 응답을 받지 못한 경우
        console.error('회원가입 오류: 서버가 응답하지 않음');
        alert('회원가입에 실패하였습니다: 서버가 응답하지 않습니다.');
      } else {
        // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생한 경우
        console.error('회원가입 오류:', error.message);
        alert(`회원가입에 실패하였습니다: ${error.message}`);
      }
    }
  };
  

  return (
    <AppLayout>
      <NoFixedTopBar text='회원가입'/>
      <Wrapper>
        <Container>
          <TextContainer>프로필 사진을 첨부해주세요</TextContainer>
          <ProfileContainer> 
            {profileImage ? (
              <ProfileImage src={URL.createObjectURL(profileImage)} alt="Profile Image" />
            ) : (
              <DefaultProfile>
                <span></span>
              </DefaultProfile>
            )}
            <HiddenProfileInput type="file" accept=".jpg" id="profileImage" onChange={handleImageChange} />
            <div>
              <CustomProfileInputLabel htmlFor="profileImage">사진 선택</CustomProfileInputLabel>
              <DeleteImage onClick={handleRemoveImage}>기본 이미지로 변경</DeleteImage>
            </div>
          </ProfileContainer>
        </Container>
        <Container>
          <TextContainer>정보를 입력해주세요</TextContainer>
          <ButtonContainer>
            <Button type='text' placeholder="이름" name="userName" onChange={handleInputChange} />
            <Button type='tel' placeholder="전화번호" name="phone" onChange={handleInputChange} />
            <Button type='email' placeholder="이메일" name="email" onChange={handleInputChange} />
            <PasswordInputContainer>
              <Button type="password" placeholder="비밀번호" name="password" onChange={handleInputChange} />
              <PasswordIcon src="/img/pw-eye.svg" alt="Password Icon" />
            </PasswordInputContainer>
            <Button
              type="number"
              placeholder="학번"
              name="schoolNum"
              onKeyDown={(e) => {
                if (e.key === '.' || e.key === '-' || e.key === '+' || e.key === 'e') {
                  e.preventDefault();
                }
              }}
              onChange={handleInputChange}
            />
            <OrangeButton text='등록' onClick={handleSignUp} />
            <Popup isOpen={isPopupOpen} onClose={handleClosePopup} title="회원가입 완료" button1="로그인 바로가기" button2="닫기">
              <p>아코팜의 회원이 되어주셔서 감사해요!</p>
            </Popup>
          </ButtonContainer>
        </Container>
      </Wrapper>
    </AppLayout>
  );
};

export default SignUpPage;
