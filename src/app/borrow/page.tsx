"use client";

import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import SelectBox from './components/SelectBox';
import AppLayout from '@/components/layout/MobileLayout';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import MainLayout from '@/components/layout/MainLayout';
import ItemPost from '../../components/BorrowItemPost'; 
import SeeDonate from './components/SeeDonate';

const ButtonContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 500px;
  font-size: 18px;
  padding-top: 20px;
  z-index: 10000;
`;

const PostContainer = styled.div`
  position: fixed;
  top: 130px;
  height: 75%;
  max-height: 635px;
  overflow-y: auto;
  width: 100%;
`;

const BorrowPage = () => {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [sortType, setSortType] = useState('NEWEST');
  const [seeDonateStatus, setSeeDonateStatus] = useState<boolean>(false);

  const moveDetail = (contractId) => {
    router.push(`/borrow-detail/${contractId}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        const response = await axios.get('/api/borrow/list', {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          params: {
            sortType: sortType
          }
        });

        if (response.data.code === 200) {
          let fetchedPosts = response.data.data;
          if (seeDonateStatus) {
            fetchedPosts = fetchedPosts.filter(post => post.price === 0); 
          }
          setPosts(fetchedPosts);
        } else {
          console.error('Failed to fetch data:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [sortType, seeDonateStatus]); // Update dependency array

  return (
    <AppLayout>
      <Header/>
      <MainLayout>
        <ButtonContainer>
          <SelectBox setSortType={setSortType}/>
          <SeeDonate setSeeDonateStatus={setSeeDonateStatus}/>
        </ButtonContainer>
        <PostContainer>
          {posts.map((post) => (
            <ItemPost key={post.contractId} post={post} onClick={() => moveDetail(post.contractId)}/>
          ))}
        </PostContainer>
      </MainLayout>
      <Navigation/>
    </AppLayout>
  );
};

export default BorrowPage;
