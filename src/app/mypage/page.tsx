'use client'
import React from "react";
import styled from 'styled-components';
import MypageList from "./components/MypageListItem";
import {useRouter} from "next/navigation";
import MyItemList from "./components/MyItemList";
import MainLayout from "@/components/layout/MainLayout";
import MyProfile from "./components/MyProfile";

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
  margin: 30px;
  padding: 0 10px;
  hr {
    width : 100%;
    color: #686868;
  }
`;

const RecentlyViewedListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  padding: 20px;
  border: 1px solid #686868;
  width: 85%;
  height: auto;
  margin: 20px auto;
  border-radius: 20px;
  hr {
    width : 100%;
    color: #686868;
  }
`;

const TextContainer = styled.p`
  font-size: 1rem;
  font-weight: 600;
  color: #686868;
`;


const Mypage = () => {
  const router = useRouter();

  const heartList = () => {
    router.push('/heart-list');
  };

  const borrowList = () => {
    router.push('/borrow-list');
  };
  
  const lendList = () => {
    router.push('/lend-list');
  };

  const profile = {
    email: "aeco@naver.com",
    userName: "아기코끼리",
    point: 108,
    image: "/img/defaultImage.png"
  };
  
  return (
    <MainLayout>
      <MyProfile 
        email={profile.email}
        userName={profile.userName}
        point={profile.point}
        image={profile.image}
      />
      <ListContainer>
        <MypageList img = "/heart-list.svg" text="내가 좋아요한 게시물" onClick={heartList}></MypageList>
        <hr/>
        <MypageList img = "/borrow.svg" text="내가 쓴 대여하기 게시물" onClick={borrowList}></MypageList>
        <hr/>
        <MypageList img = "/lend.svg" text="내가 쓴 빌려주기 게시물" onClick={lendList}></MypageList>
      </ListContainer>
      <RecentlyViewedListContainer>
        <TextContainer>최근 본 대여 물품</TextContainer>
        <hr/>
        <MyItemList/>
      </RecentlyViewedListContainer>
      </MainLayout>
  );
};
  
export default Mypage;