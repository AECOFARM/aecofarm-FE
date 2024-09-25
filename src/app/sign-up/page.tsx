"use client";
import styled, { keyframes } from "styled-components";
import AppLayout from "@/components/layout/MobileLayout";
import OrangeButton from "@/components/OrangeButton";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import NoFixedTopBar from "@/components/NoFixedTopBar";
import Popup from "@/components/Popup";
import AlertPopup from "@/components/AlertPopup";
import axios from "axios";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 500px;
`;

const Container = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
  background: ${({ theme }) => theme.colors.white};
  border-radius: 24px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 80px 10px 15px 10px;
  border: 1px solid ${({ theme }) => theme.colors.gray3};
  color: ${({ theme }) => theme.colors.orange2};
  font-size: 17px;

  &:hover {
    background: ${({ theme }) => theme.colors.orange2};
    color: ${({ theme }) => theme.colors.white};
    border: none;
  }
`;

const DefaultProfile = styled.div`
  width: 200px;
  height: 200px;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray3};
  border-radius: 11px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const DefaultProfileImage = styled.img`
  width: 100%;
  height: 40%;
  object-fit: cover;
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
  background: ${({ theme }) => theme.colors.white};
  border-radius: 24px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 10px;
  border: 1px solid ${({ theme }) => theme.colors.gray3};
  color: ${({ theme }) => theme.colors.orange2};
  font-size: 16px;

  &:hover {
    background: ${({ theme }) => theme.colors.orange2};
    color: ${({ theme }) => theme.colors.white};
    border: none;
  }
`;

const ButtonContainer = styled.div`
  gap: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  box-sizing: border-box;
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

const EmailButtonContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
`;

const EmailButton = styled.input.attrs((props) => ({
  type: props.type || "text",
}))`
  padding: 15px 22px;
  border-radius: 15px;
  border: 0;
  color: ${({ theme }) => theme.colors.gray6};
  background-color: ${({ theme }) => theme.colors.gray2};
  font-size: 17px;
  text-align: left;
  width: 70%;
`;

const EmailCheckButton = styled.button`
  width: 30%;
  background-color: ${({ theme }) => theme.colors.orange2};
  color: white;
  padding: 15px 22px;
  border: none;
  border-radius: 15px;
  font-size: 17px;
  cursor: pointer;

  &:hover {
    background-color: darkorange;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const VerificationCodeInput = styled.input`
  padding: 15px 22px;
  border-radius: 15px;
  border: 0;
  color: ${({ theme }) => theme.colors.gray6};
  background-color: ${({ theme }) => theme.colors.gray2};
  font-size: 17px;
  text-align: left;
  width: 100%;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

interface UserData {
  email: string;
  userName: string;
  password: string;
  phone: string;
  schoolNum: string;
  authCode: string;
  imageUrl: string;
}

const Button = styled.input.attrs((props) => ({
  type: props.type || "text",
}))`
  padding: 15px 22px;
  border-radius: 15px;
  border: 0;
  color: ${({ theme }) => theme.colors.gray6};
  background-color: ${({ theme }) => theme.colors.gray2};
  font-size: 17px;
  text-align: left;
  width: 100%;
`;

const SignUpPage: React.FC = () => {
  const router = useRouter();
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData>({
    email: "",
    userName: "",
    password: "",
    phone: "",
    schoolNum: "",
    authCode: "",
    imageUrl: "",
  });
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [emailVerificationStatus, setEmailVerificationStatus] = useState<
    string | null
  >(null);
  const [showVerificationCodeInput, setShowVerificationCodeInput] =
    useState<boolean>(false);
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [expectedCode, setExpectedCode] = useState<string>("");

  const formatPhoneNumber = (value: string): string => {
    const cleaned = value.replace(/\D+/g, "");
    const match = cleaned.match(/^(\d{0,3})(\d{0,4})(\d{0,4})$/);
    if (match) {
      const [, part1, part2, part3] = match;
      return [part1, part2, part3].filter(Boolean).join("-");
    }
    return value;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const formattedPhoneNumber = formatPhoneNumber(value);
      setUserData({ ...userData, [name]: formattedPhoneNumber });
    } else {
      setUserData({ ...userData, [name]: value });
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    var limit_size = 1024 * 1024;
    const file = e.target.files?.[0] || null;
    if (file) {
      var upload_size = file.size;
      if (limit_size < upload_size) {
        setIsAlertOpen(true);
        return false;
      } else {
        const reader = new FileReader();
        reader.onloadend = () => {
          setUserData((prevState) => ({
            ...prevState,
            imageUrl: reader.result as string,
          }));
        };
        reader.readAsDataURL(file);
        setProfileImage(file);
      }
    }
  };

  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);

  const handleClick = () => {
    router.push("/login");
  };

  const urlToBlob = async (url: string): Promise<Blob> => {
    const response = await fetch(url);
    const blob = await response.blob();
    return blob;
  };

  const handleEmailVerification = async () => {
    const { email, userName, password, phone, schoolNum } = userData;

    const allowedDomain = "@dgu.ac.kr";

    if (!email.endsWith(allowedDomain)) {
      alert(`이메일은 ${allowedDomain} 도메인만 허용됩니다.`);
      return;
    }

    if (!email || !userName || !password || !phone || !schoolNum) {
      alert("모든 필수 정보를 입력해주세요.");
      return;
    }

    const formData = new FormData();

    if (profileImage) {
      formData.append("file", profileImage, profileImage.name);
    } else {
      const defaultImageBlob = await urlToBlob("/img/default-image.png");
      formData.append("file", defaultImageBlob, "defaultProfileImage.jpg");
    }

    formData.append(
      "signupData",
      new Blob([JSON.stringify(userData)], { type: "application/json" })
    );

    try {
      const response = await axios.post("/api/member/signup", formData);

      if (response.data.code === 200) {
        setShowVerificationCodeInput(true);
        setExpectedCode(response.data.data.expectedCode);
        setUserData(response.data.data.signupRequestDTO);
      } else {
        alert("이메일 인증에 실패했습니다.");
      }
    } catch (error) {
      setEmailVerificationStatus("이메일 인증 요청 중 오류가 발생했습니다.");
    }
  };

  const handleSignUp = async () => {
    const requestData = {
      signupRequestDTO: {
        email: userData.email,
        userName: userData.userName,
        password: userData.password,
        phone: userData.phone,
        schoolNum: userData.schoolNum,
        imageUrl: userData.imageUrl,
      },
      authCode: verificationCode,
      expectedCode: expectedCode,
    };

    try {
      const { email, userName, password, phone, schoolNum } = userData;

      if (!email || !userName || !password || !phone || !schoolNum) {
        alert("모든 필수 정보를 입력해주세요.");
        return;
      }

      const response = await axios.post(
        "/api/member/signup/complete",
        requestData
      );

      if (response.data.code === 200) {
        handleOpenPopup(); // 회원가입 성공 시 팝업 열기
      } else {
        alert(`회원가입에 실패하였습니다. ${response.data.message}`);
      }
    } catch (error) {
      alert("회원가입에 실패하였습니다.");
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <AppLayout>
      <NoFixedTopBar text="회원가입" />
      <Wrapper>
        <Container>
          <TextContainer>프로필 사진을 첨부해주세요</TextContainer>
          <ProfileContainer>
            {profileImage ? (
              <ProfileImage src={userData.imageUrl} alt="Profile Image" />
            ) : (
              <DefaultProfile>
                <DefaultProfileImage
                  src="/img/default-image.png"
                  alt="Default Profile Image"
                />
              </DefaultProfile>
            )}
            <HiddenProfileInput
              type="file"
              id="profileImage"
              onChange={handleImageChange}
              accept="image/*"
            />
            <div>
              <CustomProfileInputLabel htmlFor="profileImage">
                사진 선택
              </CustomProfileInputLabel>
              <DeleteImage onClick={handleRemoveImage}>
                기본 이미지로 변경
              </DeleteImage>
            </div>
          </ProfileContainer>
        </Container>
        <Container>
          <TextContainer>정보를 입력해주세요</TextContainer>
          <ButtonContainer>
            <Button
              type="text"
              placeholder="이름"
              name="userName"
              required
              onChange={handleInputChange}
            />
            <PasswordInputContainer>
              <Button
                placeholder="비밀번호"
                name="password"
                required
                value={userData.password}
                onChange={handleInputChange}
                type={isPasswordVisible ? "text" : "password"}
              />
              <PasswordIcon
                src={
                  isPasswordVisible ? "/img/pw-eye-open.svg" : "/img/pw-eye.svg"
                }
                alt="Password Visibility"
                onClick={togglePasswordVisibility}
              />
            </PasswordInputContainer>
            <Button
              type="tel"
              placeholder="전화번호"
              name="phone"
              required
              value={userData.phone}
              onChange={handleInputChange}
            />
            <Button
              type="text"
              placeholder="학번"
              name="schoolNum"
              required
              onChange={handleInputChange}
            />
            <EmailButtonContainer>
              <EmailButton
                type="email"
                placeholder="학교 이메일 (@dgu.ac.kr)"
                name="email"
                required
                onChange={handleInputChange}
              />
              <EmailCheckButton onClick={handleEmailVerification}>
                인증
              </EmailCheckButton>
            </EmailButtonContainer>
            {showVerificationCodeInput && (
              <VerificationCodeInput
                type="text"
                placeholder="인증 코드"
                value={verificationCode} // Use the verificationCode state
                onChange={(e) => setVerificationCode(e.target.value)}
                required
              />
            )}
            {emailVerificationStatus && <p>{emailVerificationStatus}</p>}
            <OrangeButton
              padding={13}
              text="회원가입"
              onClick={handleSignUp}
              fullWidth={400}
            />
          </ButtonContainer>
        </Container>
        {isPopupOpen && (
          <Popup
            isOpen={isPopupOpen}
            onClose={handleClosePopup}
            title="회원가입 완료"
            button1={{ text: "확인", onClick: handleClick }}
            button2={{ text: "취소", onClick: handleClosePopup }}
          >
            3000P가 지급되었습니다!
          </Popup>
        )}
        <AlertPopup
          title="이미지 사이즈 초과"
          content="1mb 사이즈 미만의 이미지만 업로드가 가능합니다."
          button="확인"
          isOpen={isAlertOpen}
          onClose={() => setIsAlertOpen(false)}
        />
      </Wrapper>
    </AppLayout>
  );
};

export default SignUpPage;
