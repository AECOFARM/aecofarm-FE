"use client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TopBar from "@/components/TopBar";
import { Wrapper } from "@/components/CommonStyles";
import MainLayout from "@/components/layout/MainLayout";
import OrangeButton from "@/components/OrangeButton";
import { useRouter } from "next/navigation";
import Popup from "@/components/Popup";
import axios from 'axios';
import { headers } from "next/headers";

const ProfileImageContainer = styled.div<{ image?: string }>`
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

const ProfileImageEditButton = styled.form`
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

interface myProfile {
  userName: string;
  email: string;
  image: string;
  point: number;
}

const Example = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [myProfile, setMyProfile] = useState<myProfile | null>([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProfile = async () => {
      setError(null);
      setLoading(true);
      try {
        const response = await axios.get(`/api/mypage/get`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const profile = response.data.data.profile;
        setMyProfile(profile);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [token]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleClick = () => {
    router.push("/mypage");
  };

  const handleDeleteAccount = async () => {
    console.log(token)
    if (!token) {
      alert('로그인 토큰이 없습니다. 다시 로그인해 주세요.');
      router.push('/login');
      return;
    }

    try {
      const response = await axios.delete('/api/member/signout', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.code === 200) {
        alert(response.data.message); // Use the success message from the response
        router.push('/');
      } else {
        alert('회원 탈퇴에 실패하였습니다.');
      }
    } catch (error) {
      console.error(error);
      alert('회원 탈퇴에 실패하였습니다.');
    } finally {
      closeModal();
    }
  };

  const editProfile = async(e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    const updateProfileData = JSON.stringify(myProfile);
    const blob = new Blob([updateProfileData], {
      type: 'application/json'
    });

    formData.append('updateProfileData', blob);
    setError(null);
    setLoading(true);

    try {
      const response = await axios.put(`/api/mypage/update`, 
        formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setMyProfile(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <MainLayout>
      <TopBar text="프로필 수정" />
      <Wrapper>
        <ProfileImageContainer image={myProfile.image} />
        <ProfileImageEditButton>
          <p>사진 수정 및 삭제</p>
        </ProfileImageEditButton>
        <ProfileEditContainer onSubmit={editProfile}>
          <TextInputContainer>
            <EditTitle>이름</EditTitle>
            <EditInput type="text" defaultValue={myProfile.userName} value={myProfile?.userName} name="userName" onChange={handleInputChange}/>
          </TextInputContainer>
          <TextInputContainer>
            <EditTitle>이메일</EditTitle>
            <EditInput type="text" defaultValue={myProfile.email} value={myProfile?.email} name="email" onChange={handleInputChange}/>
          </TextInputContainer>
        </ProfileEditContainer>
        <ModifiedButton text="수정하기" onClick={handleClick} />
        <LeaveButton>
          <p onClick={openModal}>아코팜을 탈퇴하시겠습니까?</p>
          <Popup 
            isOpen={isOpen} 
            onClose={closeModal} 
            title="정말 탈퇴하시겠습니까?" 
            children="아코팜 탈퇴 시 관련된 모든 정보가 삭제됩니다." 
            button1={{ text: "예", onClick: handleDeleteAccount }} 
            button2={{ text: "아니오", onClick: closeModal }} 
          />
        </LeaveButton>
      </Wrapper>
    </MainLayout>
  );
};

export default Example;
