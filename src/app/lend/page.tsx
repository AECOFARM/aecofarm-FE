"use client";

import styled from 'styled-components';
import { useRouter } from 'next/navigation';
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
  z-index:10000;
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

  const moveDetail = (contractId: number) => {
    router.push(`/lend-detail/${contractId}`);
  };

  // 예시 데이터
  const exampleData = [
    {
      "contractId": 123456,
      "itemId": 1,
      "itemName": "맥북 맥세이프 충전기",
      "itemImage": "/img/item-image.png",
      "price": 3000,
      "itemPlace": "경영관",
      "time": 5,
      "contractTime": 10,
      "itemHash": ["eunjeong", "맥북프로", "충전기"],
      "likeStatus": true,
      "donateStatus": false,
      "distance": 10,
      "lowPrice": 2,
      "highPrice": 25
    },
    {
      "contractId": 789012,
      "itemId": 2,
      "itemName": "아이패드 에어 4",
      "itemImage": "/img/item-image.png",
      "price": 5000,
      "itemPlace": "신공학관",
      "time": 3,
      "contractTime": 10,
      "itemHash": ["jeongseon", "네고가능", "상태좋음"],
      "likeStatus": false,
      "donateStatus": true,
      "distance": 15,
      "lowPrice": 5,
      "highPrice": 30
    },
    {
      "contractId": 789013,
      "itemId": 3,
      "itemName": "아이패드 에어 4",
      "itemImage": "/img/item-image.png",
      "price": 5000,
      "itemPlace": "신공학관",
      "time": 3,
      "contractTime":"10",
      "itemHash": ["jeongseon", "네고가능", "상태좋음"],
      "likeStatus": false,
      "donateStatus": true,
      "distance": 15,
      "lowPrice": 5,
      "highPrice": 30
    },
    {
      "contractId": 789014,
      "itemId": 4,
      "itemName": "아이패드 에어 4",
      "itemImage": "/img/item-image.png",
      "price": 5000,
      "itemPlace": "신공학관",
      "time": 3,
      "contractTime":"10",
      "itemHash": ["jeongseon", "네고가능", "상태좋음"],
      "likeStatus": false,
      "donateStatus": true,
      "distance": 15,
      "lowPrice": 5,
      "highPrice": 30
    },
    {
      "contractId": 789015,
      "itemId": 5,
      "itemName": "아이패드 에어 4",
      "itemImage": "/img/item-image.png",
      "price": 5000,
      "itemPlace": "신공학관",
      "time": 3,
      "contractTime":"10",
      "itemHash": ["jeongseon", "네고가능", "상태좋음"],
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
        </ButtonContainer>
        <PostContainer>
          {exampleData.map((post) => (
            <ItemPost key={post.contractId} post={post} buttonVisible={true} onClick={() => moveDetail(post.contractId)}/>
           ))}
        </PostContainer>
      </MainLayout>
      <Navigation/>
    </AppLayout>
  );
};

export default BorrowPage;
