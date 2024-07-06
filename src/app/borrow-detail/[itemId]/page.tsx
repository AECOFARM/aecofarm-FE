'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import AppLayout from '@/components/layout/MobileLayout';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import MainLayout from '@/components/layout/MainLayout';

interface ItemDetail {
  contractId: number;
  itemId: number;
  itemName: string;
  itemImage: string;
  price: number;
  itemPlace: string;
  time: number;
  contractTime: number;
  itemHash: string[];
  likeStatus: boolean;
  donateStatus: boolean;
  distance: number;
  lowPrice: number;
  highPrice: number;
}

const Container = styled.div`
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  padding: 20px;
  position: relative;
  max-width: 460px;
  width: 100%;
  border-radius: 10px;
  margin: 10px;
  max-height: 700px;

`;

const ItemInfo = styled.div`
  width: 100%;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.h2`
  color: black;
  font-size: 22px;
  margin-bottom: 5px;
  font-weight: 600;
`;

const Chat = styled.div`
  font-size: 17px;
  color: #666666;
  margin: 5px 0 0 0;
  display: flex;
   
  img {
   margin-right: 3px;  
  }

`;

const Place = styled.div`
  font-size: 17px;
  color: #666666;
  margin: 5px 0 0 0;
  display: flex;
  
  img {
   margin-right: 2px;  
  }

  div {
   margin-left: 7px;
  }
`;

const TimeAndPrice = styled.p`
  font-size: 17px;
  color: #000000;
  font-weight: 400;
  margin-bottom: 5px;
`;

const HashTags = styled.div``;

const HashTag = styled.span`
  background-color: white;
  color: #FF792E;
  padding: 2px;
  margin-right: 5px;
  border-radius: 5px;
  font-size: 15px;
`;

const LikeIcon = styled.img`
  position: absolute;
  top: 40px;
  right: 45px;
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

const LendButton = styled.button`
  background-color: white;
  color: #FF792E;
  padding: 12px 15px;
  margin: 10px 5px;
  border: 1px solid #DDDDDD;
  border-radius: 24px;
  cursor: pointer;
  font-size: 14px;


  &:hover {
    background-color: #FF792E;
    color: white;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

const DetailContainer = styled.div`
  padding: 20px;
`;

const ItemImage = styled.img`
  width: 100%;
  max-width: 410px;
  height: 410px;
  margin-bottom: 20px;
  border-radius: 10px;
  border: 1px solid #e0e0e0;
`;

const BorrowDetailPage = () => {
  const { itemId } = useParams();
  const [itemDetail, setItemDetail] = useState<ItemDetail | null>(null);
  const [likeStatus, setLikeStatus] = useState(false);

  useEffect(() => {
    if (!itemId) {
      return; // Exit if itemId is not yet defined
    }

    // Fetch the item detail using itemId
    const fetchItemDetail = async () => {
      // Replace with your API call
      const exampleData: ItemDetail[] = [
        {
              "contractId": 123456,
              "itemId": 1,
              "itemName": "맥북 맥세이프 충전기",
              "itemImage": "",
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
              "contractId": 789012,
              "itemId": 3,
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
              "contractId": 789012,
              "itemId": 4,
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
              "contractId": 789012,
              "itemId": 5,
              "itemName": "아이패드 에어 4",
              "itemImage": "",
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
            }
          ];
      const item = exampleData.find((item) => item.itemId === Number(itemId));
      setItemDetail(item || null);
      if (item) {
        setLikeStatus(item.likeStatus);
      }
    };

    fetchItemDetail();
  }, [itemId]);

  const toggleLikeStatus = () => {
    setLikeStatus(prevStatus => !prevStatus);
  };

  if (!itemDetail) {
    return (
      <AppLayout>
        <Header />
        <MainLayout>
          <DetailContainer>Loading item details...</DetailContainer>
        </MainLayout>
        <Navigation />
      </AppLayout>
    );
  }

  const {
    itemName,
    itemImage,
    itemPlace,
    price,
    time,
    contractTime,
    itemHash,
  } = itemDetail;

  const likeIconSrc = likeStatus ? '/img/red-heart.svg' : '/img/empty-heart.svg';

  return (
    <AppLayout>
      <Header />
      <MainLayout>
        <Container>
          <ItemImage src={itemImage || '/img/default-image.png'} alt={itemName} />
          <ItemInfo>
            <Title>{itemName}</Title>
            <TimeAndPrice>{time}시간 | {price}P</TimeAndPrice>
            <Chat>
              <img src='/img/chat-icon.svg'/> 오픈채팅방 링크 :
            </Chat>
            <Place>
              <img src='/img/location-pin.svg' alt='location pin'/> {itemPlace}
              <div>
                <img src='/img/clock-icon.svg' alt='clock'/> {contractTime}분 이내 거래 가능
              </div>
            </Place>
            <HashTags>
              {itemHash.map((tag, index) => (
                <HashTag key={index}>#{tag}</HashTag>
              ))}
            </HashTags>
          </ItemInfo>
          <LikeIcon src={likeIconSrc} alt='like icon' onClick={toggleLikeStatus} />
          <ButtonContainer>
            <LendButton onClick={() => console.log('Lend item')}>
              오픈채팅 바로가기
            </LendButton>
            <LendButton onClick={() => console.log('Lend item')}>
              대여 요청하기
            </LendButton>
          </ButtonContainer>
        </Container>
      </MainLayout>
      <Navigation />
    </AppLayout>
  );
};

export default BorrowDetailPage;
