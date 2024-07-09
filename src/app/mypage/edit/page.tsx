"use client"
import React from "react";
import styled from "styled-components";
import TopBar from "@/components/TopBar";
import { Wrapper } from "@/components/CommonStyles";
import MainLayout from "@/components/layout/MainLayout";
import OrangeButton from "@/components/OrangeButton";
import { useRouter } from "next/navigation";

const ProfileImageContainer = styled.div<{ image? : string}>`
  background-color: ${({ image }) => (image ? "transparent" : "var(--gray3)")};
  background-image: ${({ image }) => (image ? `url(${image})` : "none")};
  background-position: center;
  background-size: cover;
  width: 30%;
  margin: 0 auto;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  border: 1px solid var(--gray3);
  margin: 20px;
`;

const ProfileImageEditButton = styled.div`
  p {
    font-size: 1rem;
    color: var(--blue);
  }
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

const ProfileEditContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 40px auto;
  gap: 30px;
  width: 80%;
`;

const TextInputContainer = styled.div`
  border-bottom: 1px solid var(--gray3);
  display: flex;
  flex-direction: row;
  gap: 20px;
  width: 100%;
  padding: 10px;
`;

const EditTitle = styled.p`
  font-size: 1rem;
  font-weight: 600;
  color: var(--gray8);
  white-space: nowrap;
`;

const EditInput = styled.input`
  outline: 0;
  border: none;
  background-color: #FFFFFF;
  width: 100%;
  box-sizing: border-box;
  color: var(--gray6);
`;
const ModifiedButton = styled(OrangeButton)`
  width: 80%;
`;

const Example = () =>{ 
  const router = useRouter();

  const handleClick = () => {
    router.push("/mypage");
  }

  const profileData = {
    userName: "이아코",
    email: "example@example.com",
    image: "/img/profile-image.png"
  };

  return (
    <MainLayout>
    <TopBar text = "프로필 수정" />
    <Wrapper>
      <ProfileImageContainer image="/img/profile-image.png"/>
      <ProfileImageEditButton>
        <p>시진 수정 및 삭제</p>
      </ProfileImageEditButton>
      <ProfileEditContainer>
        <TextInputContainer>
          <EditTitle>이름</EditTitle>
          <EditInput type='text' defaultValue={profileData.userName} />
        </TextInputContainer>
        <TextInputContainer>
          <EditTitle>이메일</EditTitle>
          <EditInput type='text' defaultValue={profileData.email} />
        </TextInputContainer>
      </ProfileEditContainer>
      <ModifiedButton text="수정하기" onClick={handleClick} />
    </Wrapper>
    </MainLayout>
  )
}

export default Example;