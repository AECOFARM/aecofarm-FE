'use client';
import styled from 'styled-components';
import AppLayout from "@/components/layout/MobileLayout";
import OrangeButton from '@/components/OrangeButton';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import NoFixedTopBar from '@/components/NoFixedTopBar';
import Popup from '@/components/Popup';
import axios from 'axios';

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
  cursor: pointer;
`;

interface UserData {
  email: string;
  userName: string;
  password: string;
  phone: string;
  schoolNum: string;
}

const SignUpPage: React.FC = () => {
  const router = useRouter();
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData>({
    email: '',
    userName: '',
    password: '',
    phone: '',
    schoolNum: ''
  });
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedValue = name === 'schoolNum' ? parseInt(value) : value; // schoolNum을 정수로 변환
    setUserData({ ...userData, [name]: updatedValue });
  };
  

  const handleRemoveImage = () => {
    setProfileImage(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProfileImage(e.target.files[0]);
    }
  };

  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);

  const handleClick = () => {
    router.push('/login');
  };

  const handleSignUp = async () => {
    const formData = new FormData();

    if (profileImage) {
        formData.append('file', profileImage, profileImage.name);
    }

    // Ensure the user data is sent correctly
    formData.append('signupData', new Blob([JSON.stringify(userData)], { type: 'application/json' }));

    try {
        const response = await axios.post('/api/member/signup', formData);

        if (response.data.code === 200) {
            handleOpenPopup();
        } else {
            alert('회원가입에 실패하였습니다.');
        }
    } catch (error) {
        alert(`회원가입에 실패하였습니다: ${error.response?.data?.message || error.message}`);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevVisibility) => !prevVisibility);
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
              <Button
                type={isPasswordVisible ? 'text' : 'password'}
                placeholder="비밀번호"
                name="password"
                onChange={handleInputChange}
              />
              <PasswordIcon
                src={isPasswordVisible ? '/img/pw-eye-open.svg' : '/img/pw-eye.svg'}
                alt="Password Icon"
                onClick={togglePasswordVisibility}
              />
            </PasswordInputContainer>
            <Button
              type="number"
              placeholder="학번"
              name="schoolNum"
              onKeyDown={(e) => {
                if (['.', '-', '+', 'e'].includes(e.key)) {
                  e.preventDefault();
                }
              }}
              onChange={handleInputChange}
            />
            <OrangeButton text='등록' onClick={handleSignUp} />
            <Popup isOpen={isPopupOpen} onClose={handleClosePopup} title="회원가입 완료! "
             button1={{
              text: '확인',
              onClick: () => {
                handleClick();
              },
            }}
            button2={{
              text: '닫기',
              onClick: handleClosePopup,
            }}

            >
             <p>3000P가 지급 되었어요!</p>
            </Popup>
          </ButtonContainer>
        </Container>
      </Wrapper>
    </AppLayout>
  );
};

export default SignUpPage;
