'use client';
import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import TopBar from "@/components/TopBar";
import { Wrapper } from "@/components/CommonStyles";
import MainLayout from "@/components/layout/MainLayout";
import OrangeButton from "@/components/OrangeButton";
import { useRouter } from "next/navigation";
import Popup from "@/components/Popup";
import AlertPopup from "@/components/AlertPopup";
import axios from 'axios';

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

const ProfileImageEditButton = styled.div`
  p {
    font-size: 1rem;
    color: var(--blue);
  }
  display: flex;
  justify-content: center;
  cursor: pointer;
  input {
    display: none;
  }
`;

const ProfileEditContainer = styled.form`
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
  width: 100%;
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

interface Profile {
  userName: string;
  email: string;
  image: string;
  point: number;
}

const UpdateMypage = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setError(null);
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error("No token found");
        }
        const response = await axios.get(`/api/mypage/get`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const profileData = response.data.data.profile;
        setProfile(profileData);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };



  const handleDeleteAccount = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('로그인 토큰이 없습니다. 다시 로그인해 주세요.');
      router.push('/login');
      return;
    }

    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/member/signout`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.code === 200) {
        alert('회원정보가 삭제되었습니다.'); // Use the success message from the response
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

  const editProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    const updateProfileData = JSON.stringify({
      userName: profile?.userName,
      email: profile?.email
    });
    const blob = new Blob([updateProfileData], {
      type: 'application/json'
    });

    formData.append('updateProfileData', blob);

    if (file) {
      formData.append('file', file);
    } else {
      formData.append('file', new File([""], "empty.txt", { type: "text/plain" }));
    }

    console.log("Updated Profile Data:", updateProfileData); // Print updateProfileData
    console.log("Updated Profile file:", file); // Print updateProfileData

    setError(null);
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("No token found");
      }
      const response = await axios.patch('/api/mypage/update', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (response.data.code === 200) {
        setIsAlertOpen(true);
      } else {
        alert('프로필 수정에 실패하였습니다.');
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = () => {
    setIsAlertOpen(false);
    router.push('/mypage');
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prevState => {
      const updatedProfile = prevState ? {
        ...prevState,
        [name]: value
      } : null;
      console.log("Updated Profile:", updatedProfile); // Print updated profile details
      return updatedProfile;
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prevState => prevState ? {
          ...prevState,
          image: reader.result as string
        } : null);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const fileInputClick = (e: React.MouseEvent) => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <MainLayout>
      <TopBar text="프로필 수정" />
      <Wrapper>
        <ProfileImageContainer image={profile?.image} />
        <ProfileImageEditButton>
          <input type="file" onChange={handleFileChange} ref={fileInputRef} accept="image/*" />
          <p onClick={fileInputClick}>사진 수정 및 삭제</p>
        </ProfileImageEditButton>
        <ProfileEditContainer onSubmit={editProfile}>
          <TextInputContainer>
            <EditTitle>이름</EditTitle>
            <EditInput 
              type="text" 
              value={profile?.userName || ''} 
              name="userName" 
              onChange={handleInputChange} 
            />
          </TextInputContainer>
          <TextInputContainer>
            <EditTitle>이메일</EditTitle>
            <EditInput 
              type="text" 
              value={profile?.email || ''} 
              name="email" 
              onChange={handleInputChange} 
            />
          </TextInputContainer>
          <ModifiedButton text="수정하기" />
        </ProfileEditContainer>
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
        <AlertPopup isOpen={isAlertOpen} title="프로필 수정 완료!" content="프로필 수정을 완료하였습니다! 마이페이지에서 확인하세요." button="확인" onClose={handleUpdate} />
      </Wrapper>
    </MainLayout>
  );
};

export default UpdateMypage;
