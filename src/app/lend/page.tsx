"use client";

import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import SelectBox from './components/SelectBox';
import AppLayout from '@/components/layout/MobileLayout';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import MainLayout from '@/components/layout/MainLayout';
import ItemPost from '../../components/LendItemPost'; 

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

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await fetch(`/api/lend/list?sortType=${sortType}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const result = await response.json();
        
        if (response.ok) {
          setPosts(result.data);
        } else {
          console.error('Error fetching data:', result.message);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [sortType]);

  const moveDetail = (contractId: number) => {
    router.push(`/lend-detail/${contractId}`);
  };

  return (
    <AppLayout>
      <Header />
      <MainLayout>
        <ButtonContainer>
          <SelectBox onChange={(value) => setSortType(value)} />
        </ButtonContainer>
        <PostContainer>
          {posts.map((post) => (
            <ItemPost key={post.contractId} post={post} buttonVisible={true} onClick={() => moveDetail(post.contractId)} />
          ))}
        </PostContainer>
      </MainLayout>
      <Navigation />
    </AppLayout>
  );
};

export default BorrowPage;

