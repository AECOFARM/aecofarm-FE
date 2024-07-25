import React, { useState } from 'react';
import styled from 'styled-components';
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
  cursor: pointer;
`;

const ItemInfo = styled.div`
  width: 90%;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.h2`
  color: black;
  font-size: 19px;
  margin-bottom: 5px;
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
`;

const Place = styled.div`
  font-size: 13px;
  color: var(--gray6);
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
  font-size: 13px;
  color: black;
  font-weight: 400;
  margin-bottom: 5px;
  
`;

const HashTags = styled.div``;

const HashTag = styled.span`
  background-color: white;
  color: var(--orange2);
  padding: 2px;
  margin-right: 5px;
  border-radius: 5px;
  font-size: 13px;
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

interface LendItemPostProps {
  post: Post;
  buttonVisible?: boolean; 
  onClick?: () => void;
}

const LendItemPost: React.FC<LendItemPostProps> = ({ post }) => {
  const {
    contractId,
    itemId,
    itemName,
    itemPlace,
    price,
    time,
    contractTime,
    itemHash,
    likeStatus: initialLikeStatus,
  } = post;

  const router = useRouter();
  const moveDetail = () => {
    router.push(`lend-detail/${contractId}`);
  }
  const token = localStorage.getItem('token');

  const [likeStatus, setLikeStatus] = useState(initialLikeStatus);

  const likeIconSrc = likeStatus ? '/img/red-heart.svg' : '/img/empty-heart.svg';

  const toggleLikeStatus = async (event: React.MouseEvent) => {
    event.stopPropagation();
    if (likeStatus) {
      const response = await axios.delete(`/api/likes/delete/${contractId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        data: { itemId: itemId }
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
  };

  return (
    <Container onClick={moveDetail}>
      <ItemInfo>
        <Title>{itemName}</Title>
        <TimeAndPrice>{time}시간 | {price}P</TimeAndPrice>
        <Place>
          <img src='/img/location-pin.svg' alt='location pin' /> {itemPlace}
          <div>
            <img src='/img/clock-icon.svg' alt='clock'/> {contractTime}분 이내 거래 희망
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

export default LendItemPost;
