'use client'
import React, {useState, useEffect} from "react";
import styled from 'styled-components';
import MypageList from "./components/MypageListItem";
import {useRouter} from "next/navigation";
import MyItemList from "./components/MyItemList";
import MainLayout from "@/components/layout/MainLayout";
import MyProfile from "./components/MyProfile";
import axios from "axios";

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
  margin: 30px;
  padding: 0 10px;
  hr {
    width : 100%;
    border: 0;
    height: 1px;
    background-color: #686868;
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
    border: 0;
    height: 1px;
    background-color: #686868;
  }
`;

const TextContainer = styled.p`
  font-size: 1.1rem;
  font-weight: 700;
  color: #686868;
`;

interface myProfile {
  userName: string;
  email: string;
  image: string;
  point: number;
}


const Mypage = () => {
  const router = useRouter();
  const [myProfile, setMyProfile] = useState<myProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
        const errorMessage = (err as Error).message || 'Something went wrong';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [token]);

  const heartList = () => {
    router.push('/heart-list');
  };

  const postList = () => {
    router.push('/post-list');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <MainLayout>
      {myProfile ? (
        <MyProfile 
        userName={myProfile.userName}
        point={myProfile.point}
        image={myProfile.image}
        email={myProfile.email}
        />
      ) : (
        <div>Profile not found</div>
      )}
      
      <ListContainer>
        <MypageList img = "/heart-list.svg" text="내가 좋아요한 게시물" onClick={heartList}></MypageList>
        <hr/>
        <MypageList img = "/post-list.svg" text="내가 쓴 게시물" onClick={postList}></MypageList>
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