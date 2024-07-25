import React, { useState } from 'react';
import styled from 'styled-components';
import DonateLabel from './DonateLabel';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const Container = styled.div`
  background-color: white;
  border-bottom: 1px solid var(--gray3);
  padding: 10px 10px;
  position: relative;
  display: flex;
  max-width: 480px;
  width: 100%;
  justify-content: center;
  cursor: pointer;
`;

const ItemImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  border: 1px solid var(--gray3);
`;

const ItemInfo = styled.div`
  width: 75%;
  padding: 0 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  width: 100%;
`;

const Title = styled.h2`
  color: black;
  width: 72%;
  font-size: 19px;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
`;

const Place = styled.div`
  font-size: 13px;
  color: var(--gray6);
  display: flex;

  img {
   margin-right: 2px;  
  }

  div {
   margin-left: 7px;
  }
`;

const TimeAndPrice = styled.p`
  font-size: 14px;
  color: black;
  font-weight: 400;
`;

const HashTags = styled.div`
`;

const HashTag = styled.span`
  background-color: white;
  color: var(--orange2);
  padding: 2px;
  margin-right: 5px;
  border-radius: 5px;
  font-size: 13px;
  white-space: nowrap;
`;

const LikeIcon = styled.img`
  position: absolute;
  top: 10px;
  right: 20px;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

interface Post {
  contractId: number;
  itemId?: number;
  itemName: string;
  itemImage?: string;
  itemPlace: string;
  price: number;
  time: number;
  contractTime: number;
  itemHash: string[];
  likeStatus: boolean;
  donateStatus: boolean;
  distance?: number;
  lowPrice?: number;
  highPrice?: number;
}

interface BorrowItemPostProps {
  post: Post;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}


const BorrowItemPost: React.FC<BorrowItemPostProps> = ({ post, onClick }) => {
  const {
    contractId,
    itemId, // 여기서 itemId를 받아옵니다.
    itemName,
    itemImage,
    itemPlace,
    price,
    time,
    contractTime,
    itemHash,
    likeStatus: initialLikeStatus,
    donateStatus
  } = post;

  const router = useRouter();
  const token = localStorage.getItem('token');
  const [likeStatus, setLikeStatus] = useState(initialLikeStatus);

  const likeIconSrc = likeStatus ? '/img/red-heart.svg' : '/img/empty-heart.svg';

  const toggleLikeStatus = async () => {
    try {
      if (likeStatus) {
        const response = await axios.delete(`/api/likes/delete/${contractId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          data: { itemId: itemId } // 여기서 itemId를 사용합니다.
        });
        console.log(response);
      } else {
        const response = await axios.post(`/api/likes/add/${contractId}`, {}, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log(response);
      } 
      setLikeStatus(prevStatus => !prevStatus);
    } catch (error) {
      console.error("An error occurred while toggling like status:", error);
    }
  };

  let imageSrc = itemImage || "/img/default-image.png";

  return (
    <Container data-contract-id={contractId.toString()} onClick={onClick}>
      <ItemImage src={imageSrc} alt={itemName} />
      <ItemInfo>
        <TitleContainer>
          <Title>{itemName}</Title>
          {donateStatus && <DonateLabel />}
        </TitleContainer>
        <TimeAndPrice>{time}시간 | {price}P</TimeAndPrice>
        <Place>
          <img src='/img/location-pin.svg' alt='location pin' /> {itemPlace}
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
    </Container>
  );
};

export default BorrowItemPost;
