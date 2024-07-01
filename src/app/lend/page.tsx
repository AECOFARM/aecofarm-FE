// LendPage.js
"use client";

import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import SelectBox from './components/SelectBox';
import AppLayout from '@/components/layout/MobileLayout';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import MainLayout from '@/components/layout/MainLayout';
import ItemPost from './components/ItemPost'; // ItemPost 컴포넌트를 불러옵니다

const ButtonContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: 18px;
  padding-top: 20px;
`;

const DonateContainer = styled.div`
  margin-right: 25px;
  width: 150px;
  display: flex;
`;

const CheckDonateButton = styled.button`
  margin: 0 5px;
  color: black;
  border: 0px;
  background-color: white;
  width: auto;
  font-size: 18px;
`;

const CheckIcon = styled.img`
  width: 30px;
  right: 10px;
  top: 50%;
  padding: 0 2px;
`;

const LendPage = () => {
  const router = useRouter();

  const login = () => {
    router.push('/lend');
  };

  const handleClick = () => {
    router.push('/sign-up');
  };

  // 예시 데이터
  const exampleData = [
    {
      "contractId": 123456,
      "itemId": 789012,
      "itemName": "게시물 제목 1",
      "itemImage": "/images/item1.jpg",
      "price": 5000,
      "itemPlace": "서울시 강남구",
      "time": 1625123456,
      "itemHash": ["태그1", "태그2", "태그3"],
      "likeStatus": true,
      "donateStatus": false,
      "distance": 10,
      "lowPrice": 2,
      "highPrice": 25
    },
    {
      "contractId": 789012,
      "itemId": 345678,
      "itemName": "게시물 제목 2",
      "itemImage": "/images/item2.jpg",
      "price": 8000,
      "itemPlace": "경기도 수원시",
      "time": 1625123456,
      "itemHash": ["태그4", "태그5", "태그6"],
      "likeStatus": false,
      "donateStatus": true,
      "distance": 15,
      "lowPrice": 5,
      "highPrice": 30
    }
  ];

  return (
    <AppLayout>
      <Header/>
      <MainLayout>
        <ButtonContainer>
          <SelectBox/>
          <DonateContainer>
            <CheckDonateButton>기부 모아보기</CheckDonateButton>
            <CheckIcon src='/img/not-checked.svg' alt='check' />
          </DonateContainer>
        </ButtonContainer>
        
       
        {exampleData.map((post) => (
          <ItemPost key={post.itemId} post={post} />
        ))}
        
      </MainLayout>
      <Navigation/>
    </AppLayout>
  );
};

export default LendPage;
