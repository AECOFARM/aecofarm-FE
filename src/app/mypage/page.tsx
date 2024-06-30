'use client'
import React from "react";
import styled from 'styled-components';
import AppLayout from "@/components/layout/MobileLayout";
import MypageList from "./components/MypageList";
import {useRouter} from "next/navigation";
import ItemList from "@/components/ItemList";
import MainLayout from "@/components/layout/MainLayout";

const ProfileContainer = styled.div`
  position: relative;
  width: 85%;
  background: #FFFFFF;
  border-radius: 20px;
  padding: 20px;
  margin: 20px auto;
  margin-top: 80px;
  display: flex;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
`;

const ProfileImageContainer = styled.img`
  box-sizing: border-box;
  width: 90px;
  height: 90px;
  box-shadow: 1px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 1rem;
  img {
    width: 90px;
    height: 90px;
  }
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
const ProfilePointContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  p {
    color: #686868;
    font-size: 0.9rem;
  }
  .point {
    color: #DF5532;
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
    color: #AAAAAA;
  }
`;

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

const ItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  overflow-y: hidden;
  width: 100%;
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
  
  return (
    <AppLayout>
      <MainLayout>
      <ProfileContainer>
        <ProfileImageContainer src = "/img/defaultImage.png" />
        <ProfileContentContainer>
          <ProfileNameContainer>아기코끼리</ProfileNameContainer>
          <ProfilePointContainer>
            <p>Point</p>
            <p>|</p>
            <p className="point">108P</p>
          </ProfilePointContainer>
        </ProfileContentContainer>
        <ButtonContainer>
            <p>프로필 수정</p>
            <p>|</p>
            <p>로그아웃</p>
          </ButtonContainer>
      </ProfileContainer>
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
        <ItemContainer>
          <ItemList img = "/img/item-image.png" price = "3,000" time = {3} title = "초고속 멀티 충전기"/>
          <ItemList img = "/img/item-image.png" price = "3,000" time = {3} title = "초고속 멀티 충전기"/>
          <ItemList img = "/img/item-image.png" price = "3,000" time = {3} title = "초고속 멀티 충전기"/>
          <ItemList img = "/img/item-image.png" price = "3,000" time = {3} title = "초고속 멀티 충전기"/>
        </ItemContainer>
      </RecentlyViewedListContainer>
      </MainLayout>
    </AppLayout>
  );
};
  
export default Mypage;