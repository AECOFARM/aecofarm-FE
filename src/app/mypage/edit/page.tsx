"use client";
import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import TopBar from "@/components/TopBar";
import { Wrapper } from "@/components/CommonStyles";
import MainLayout from "@/components/layout/MainLayout";
import OrangeButton from "@/components/OrangeButton";
import { useRouter } from "next/navigation";
import Popup from "@/components/Popup";
import AlertPopup from "@/components/AlertPopup";
import axios from "axios";
import { text } from "stream/consumers";

const ProfileImageContainer = styled.div<{ image?: string }>`
  background-color: ${({ image }) =>
    image ? "transparent" : "${({ theme }) => theme.colors.gray3}"};
  background-image: ${({ image }) => (image ? `url(${image})` : "none")};
  background-position: center;
  background-size: cover;
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.gray3};
`;

const ProfileImageEditButton = styled.div`
  p {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.blue};
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
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray3};
  display: flex;
  flex-direction: row;
  gap: 20px;
  width: 100%;
  padding: 10px;
`;

const EditTitle = styled.p`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray8};
  white-space: nowrap;
`;

const EditInput = styled.input`
  outline: 0;
  border: none;
  background-color: ${({ theme }) => theme.colors.white};
  width: 100%;
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.gray6};
`;

const LeaveButton = styled.div`
  font-size: 0.9rem;
  underline: 1px solid ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.gray8};
  margin: 20px;
  cursor: pointer;
  p {
    text-decoration: underline;
  }
`;

const ImageComtainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`;

interface Profile {
  userName: string;
  email: string;
  image: string;
  point: number;
}

const UpdateMypage = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isCompleteOpen, setIsCompleteOpen] = useState<boolean>(false);
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
  const [isImageEditOpen, setIsImageEditOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setError(null);
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }
        const response = await axios.get(`/api/mypage/get`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const profileData = response.data.data.profile;
        setProfile(profileData);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
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
    const token = localStorage.getItem("token");
    if (!token) {
      alert("로그인 토큰이 없습니다. 다시 로그인해 주세요.");
      router.push("/login");
      return;
    }

    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/member/signout`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.code === 200) {
        alert("회원정보가 삭제되었습니다."); // Use the success message from the response
        router.push("/");
      } else {
        alert("회원 탈퇴에 실패하였습니다.");
      }
    } catch (error) {
      console.error(error);
      alert("회원 탈퇴에 실패하였습니다.");
    } finally {
      closeModal();
    }
  };

  const editProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    const updateProfileData = JSON.stringify({
      userName: profile?.userName,
      email: profile?.email,
    });
    const blob = new Blob([updateProfileData], {
      type: "application/json",
    });

    formData.append("updateProfileData", blob);

    if (file) {
      formData.append("file", file);
    } else {
      formData.append(
        "file",
        new File([""], "empty.txt", { type: "text/plain" })
      );
    }

    setError(null);
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      const response = await axios.patch("/api/mypage/update", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.code === 200) {
        setIsCompleteOpen(true);
      } else {
        alert("프로필 수정에 실패하였습니다.");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = () => {
    setIsCompleteOpen(false);
    router.push("/mypage");
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prevState) => {
      const updatedProfile = prevState
        ? {
            ...prevState,
            [name]: value,
          }
        : null;
      return updatedProfile;
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    var limit_size = 1024 * 1024;
    const selectedFile = e.target.files?.[0] || null;

    if (selectedFile) {
      var upload_size = selectedFile.size;
      if (limit_size < upload_size) {
        setIsAlertOpen(true);
        return false;
      } else {
        const reader = new FileReader();
        reader.onloadend = () => {
          setProfile((prevState) =>
            prevState
              ? {
                  ...prevState,
                  image: reader.result as string,
                }
              : null
          );
        };
        reader.readAsDataURL(selectedFile);
        setFile(selectedFile);
      }
    }
  };

  const fileInputClick = (e: React.MouseEvent) => {
    if (fileInputRef.current) {
      setIsImageEditOpen(false);
      fileInputRef.current.click();
    }
  };

  const removeImage = () => {
    setIsImageEditOpen(false);
    setProfile((prevState) =>
      prevState
        ? {
            ...prevState,
            image: "",
          }
        : null
    );
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // 파일 input 값을 초기화
    }
  };

  const editButton = {
    text: "수정",
    onClick: fileInputClick,
  };
  const removeButton = {
    text: "삭제",
    onClick: removeImage,
  };

  return (
    <MainLayout>
      <TopBar text="프로필 수정" />
      <Wrapper>
        <ImageComtainer>
          <ProfileImageContainer
            image={profile?.image || "/img/default-image.png"}
          />
          <ProfileImageEditButton>
            <input
              type="file"
              onChange={handleFileChange}
              ref={fileInputRef}
              accept="image/*"
            />
            <p onClick={() => setIsImageEditOpen(true)}>사진 수정 및 삭제</p>
          </ProfileImageEditButton>
        </ImageComtainer>
        <ProfileEditContainer onSubmit={editProfile}>
          <TextInputContainer>
            <EditTitle>이름</EditTitle>
            <EditInput
              type="text"
              value={profile?.userName || ""}
              name="userName"
              onChange={handleInputChange}
            />
          </TextInputContainer>
          <TextInputContainer>
            <EditTitle>이메일</EditTitle>
            <EditInput
              type="text"
              value={profile?.email || ""}
              name="email"
              onChange={handleInputChange}
            />
          </TextInputContainer>
          <OrangeButton padding={12} text="수정하기" />
        </ProfileEditContainer>
        <LeaveButton>
          <p onClick={openModal}>아코팜을 탈퇴하시겠습니까?</p>
          <Popup
            isOpen={isOpen}
            onClose={closeModal}
            title="정말 탈퇴하시겠습니까?"
            button1={{ text: "예", onClick: handleDeleteAccount }}
            button2={{ text: "아니오", onClick: closeModal }}
          >
            아코팜 탈퇴 시 관련된 모든 정보가 삭제됩니다.
          </Popup>
        </LeaveButton>
        <AlertPopup
          isOpen={isCompleteOpen}
          title="프로필 수정 완료!"
          content="프로필 수정을 완료하였습니다! 마이페이지에서 확인하세요."
          button="확인"
          onClose={handleUpdate}
        />
        <AlertPopup
          title="이미지 사이즈 초과"
          content="1mb 사이즈 미만의 이미지만 업로드가 가능합니다."
          button="확인"
          isOpen={isAlertOpen}
          onClose={() => setIsAlertOpen(false)}
        />
        <Popup
          isOpen={isImageEditOpen}
          title=""
          button1={editButton}
          button2={removeButton}
          onClose={() => setIsImageEditOpen(false)}
        />
      </Wrapper>
    </MainLayout>
  );
};

export default UpdateMypage;
