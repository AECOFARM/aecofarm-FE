import styled from "styled-components";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Popup from "@/components/Popup";
import axios from "axios";
import Image from "next/image";

const ProfileContainer = styled.div`
  position: relative;
  width: 85%;
  background: #ffffff;
  border-radius: 20px;
  padding: 20px 15px;
  margin: 20px auto;
  margin-top: 80px;
  display: flex;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
`;

const ProfileImageContainer = styled.div`
  width: 90px;
  height: 90px;
  border: 1px solid var(--gray5);
  border-radius: 50%;
  overflow: hidden;
  position: relative;
`;

const ProfileContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  margin: 0 15px;
`;

const ProfileNameContainer = styled.p`
  font-weight: 600;
  font-size: 1.2rem;
  color: #686868;
`;

const ProfileEmailContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  p {
    color: #686868;
    font-size: 0.6rem;
  }
  .email {
    font-size: 0.7rem;
  }
`;

const ProfilePointContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  p {
    color: #686868;
    font-size: 0.6rem;
  }
  .point {
    font-size: 0.7rem;
    color: #df5532;
    font-weight: 500;
  }
`;

const ButtonContainer = styled.div`
  margin: 20px;
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  top: 0px;
  right: 0px;
  p {
    font-size: 0.6rem;
    color: #aaaaaa;
  }
  .logout,
  .edit {
    cursor: pointer;
  }
`;

interface ProfileProps {
  userName: string;
  email: string;
  image: string;
  point: number;
}

const MyProfile: React.FC<ProfileProps> = ({
  userName,
  email,
  image,
  point,
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const profileEdit = () => {
    router.push("/mypage/edit");
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "/api/member/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.code === 200) {
        alert(response.data.data); // 로그아웃 성공 메시지
        localStorage.removeItem("token"); // 로그아웃 시 토큰 삭제
        router.push("/login"); // 로그인 페이지로 리디렉션
      } else {
        alert("로그아웃에 실패하였습니다.");
      }
    } catch (error) {
      console.error("로그아웃 오류:", error);
      alert("로그아웃에 실패하였습니다.");
    }
  };

  return (
    <ProfileContainer>
      <ProfileImageContainer>
        <Image src={image} alt="profile-img" width={90} height={90} priority />
      </ProfileImageContainer>
      <ProfileContentContainer>
        <ProfileNameContainer>{userName}</ProfileNameContainer>
        <ProfileEmailContainer>
          <p>Email</p>
          <p className="email">{email}</p>
        </ProfileEmailContainer>
        <ProfilePointContainer>
          <p>Point</p>
          <p className="point">{point}P</p>
        </ProfilePointContainer>
      </ProfileContentContainer>
      <ButtonContainer>
        <p onClick={profileEdit} className="edit">
          프로필 수정
        </p>
        <p>|</p>
        <p onClick={openModal} className="logout">
          로그아웃
        </p>
      </ButtonContainer>
      <Popup
        isOpen={isOpen}
        onClose={closeModal}
        title="로그아웃 하시겠습니까?"
        children=""
        button1={{ text: "예", onClick: handleLogout }}
        button2={{ text: "아니오", onClick: closeModal }}
      />
    </ProfileContainer>
  );
};

export default MyProfile;
