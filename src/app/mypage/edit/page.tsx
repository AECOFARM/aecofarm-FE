"use client"
import React, {useState} from "react";
import styled from "styled-components";
import TopBar from "@/components/TopBar";
import { Wrapper } from "@/components/CommonStyles";
import MainLayout from "@/components/layout/MainLayout";
import OrangeButton from "@/components/OrangeButton";
import { useRouter } from "next/navigation";
import Popup from "@/components/Popup";

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
  background-color: var(--white);
  width: 100%;
  box-sizing: border-box;
  color: var(--gray6);
`;
const ModifiedButton = styled(OrangeButton)`
  width: 80%;
`;

const LeaveButton = styled.div`
  font-size: 0.9rem;
  underline: 1px solid var(--black);
  color: var(--gray8);
  margin: 20px;
  cursor: pointer;
  p {
    text-decoration: underline;
  }
`;

const Example = () =>{ 
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  const handleClick = () => {
    router.push("/mypage");
  }

  const profileData = {
    userName: "이아코",
    email: "aeco@naver.com",
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
      <LeaveButton> 
        <p onClick={openModal}>아코팜을 탈퇴하시겠습니까?</p>
        <Popup isOpen={isOpen} onClose={closeModal} title="정말 탈퇴하시겠습니까?" children="아코팜 탈퇴 시 관련된 모든 정보가 삭제됩니다" button1="예" button2="아니오" />
      </LeaveButton>
    </Wrapper>
    </MainLayout>
  )
}

export default Example;