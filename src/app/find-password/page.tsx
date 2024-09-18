"use client";
import React, { useState, ChangeEvent } from "react";
import styled from "styled-components";
import AppLayout from "@/components/layout/MobileLayout";
import MainLayout from "@/components/layout/MainLayout";
import NoFixedTopBar from "@/components/NoFixedTopBar";
import OrangeButton from "@/components/OrangeButton";
import { useRouter } from "next/navigation";
import axios from "axios";

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

const Input = styled.input`
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
  cursor: pointer;
`;

const FindPassword: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [schoolNum, setSchoolNum] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const handleClick = async () => {
    try {
      const response = await axios.post("/api/member/update/pw", {
        email,
        userName,
        schoolNum: Number(schoolNum),
        password,
      });

      if (response.data.code === 200) {
        alert("비밀번호 변경에 성공하였습니다!");
        router.push("/login");
      } else {
        alert("비밀번호 변경에 실패하였습니다. 정보를 다시 확인해주세요.");
      }
    } catch (error) {
      console.error("Error occurred while updating password:", error);
      alert("비밀번호 변경에 실패하였습니다.");
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    switch (name) {
      case "userName":
        setUserName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "schoolNum":
        // 학번 입력 시 숫자만 허용
        if (/^\d*$/.test(value)) {
          setSchoolNum(value);
        }
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevVisibility) => !prevVisibility);
  };

  return (
    <AppLayout>
      <MainLayout>
        <Wrapper>
          <NoFixedTopBar text="비밀번호 변경" />
          <TextContainer>
            기존 회원 정보를 입력해주세요! <br />
            <p>모든 정보가 일치하면 비밀번호를 변경할 수 있어요 </p>
          </TextContainer>
          <ButtonContainer>
            <Input
              type="text"
              placeholder="이름"
              name="userName"
              value={userName}
              onChange={handleInputChange}
            />
            <Input
              type="email"
              placeholder="이메일"
              name="email"
              value={email}
              onChange={handleInputChange}
            />
            <Input
              type="text"
              placeholder="학번"
              name="schoolNum"
              value={schoolNum}
              onChange={handleInputChange}
            />
            <PasswordInputContainer>
              <Input
                type={isPasswordVisible ? "text" : "password"}
                placeholder="새로운 비밀번호"
                name="password"
                value={password}
                onChange={handleInputChange}
              />
              <PasswordIcon
                src={
                  isPasswordVisible ? "/img/pw-eye-open.svg" : "/img/pw-eye.svg"
                }
                alt="Password Icon"
                onClick={togglePasswordVisibility}
              />
            </PasswordInputContainer>
            <OrangeButton
              padding={13}
              text="비밀번호 변경"
              onClick={handleClick}
              fullWidth={400}
            />
          </ButtonContainer>
        </Wrapper>
      </MainLayout>
    </AppLayout>
  );
};

export default FindPassword;
