'use client'
import React from "react";
import styled from 'styled-components';
import AppLayout from "@/components/layout/MobileLayout";

const ProfileContainer = styled.div`
  box-sizing: border-box;
  width: 90%;
  height: 125px;
  background: #FDFDFD;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 2rem;
  padding: 20px;
`;

const ProfileImageContainer = styled.img`
  box-sizing: border-box;
  position: relative;
  width: 84px;
  height: 84px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 1rem;
  img {
    width: 84px;
    height: 84px;
  }
`;

const Mypage = () => {
    return (
      <ProfileContainer>
        <ProfileImageContainer src = "/img/defaultImage.png" />
      </ProfileContainer>
    );
  };
  
export default Mypage;