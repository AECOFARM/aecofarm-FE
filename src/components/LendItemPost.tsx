import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  padding: 10px 10px;
  position: relative;
  display: flex;
  max-width: 480px;
  width: 100%;
  cursor: pointer;
`;

const ItemInfo = styled.div`
  width: 75%;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.h2`
  color: black;
  font-size: 19px;
  margin-bottom: 5px;
  font-weight: 600;
`;

const Place = styled.div`
  font-size: 13px;
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
  font-size: 13px;
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

const LendButton = styled.button<{ visible: boolean }>`
  display: ${({ visible }) => (visible ? 'flex' : 'none')};
  position: absolute;
  bottom: 10px;
  right: 20px;
  background-color: white;
  color: #FF792E;
  padding: 10px 15px;
  border: 1px solid #DDDDDD;
  border-radius: 24px;
  cursor: pointer;
  font-size: 14px;
  padding: 8px 12px;

  &:hover {
    background-color: #FF792E;
    color: white;
  }
`;

interface Post {
  contractId: number;
  itemId: number;
  itemName: string;
  itemPlace: string;
  price: number;
  time: number;
  contractTime: number;
  itemHash: string[];
  likeStatus: boolean;
  donateStatus: boolean;
  distance: number;
  lowPrice: number;
  highPrice: number;
}

interface LendItemPostProps {
  post: Post;
  buttonVisible: boolean;
}

const LendItemPost: React.FC<LendItemPostProps> = ({ post, buttonVisible }) => {
  const {
    itemName,
    itemPlace,
    price,
    time,
    contractTime,
    itemHash,
    likeStatus: initialLikeStatus,
  } = post;

  const [likeStatus, setLikeStatus] = useState(initialLikeStatus);

  const likeIconSrc = likeStatus ? '/img/red-heart.svg' : '/img/empty-heart.svg';

  const toggleLikeStatus = () => {
    setLikeStatus(prevStatus => !prevStatus);
  };

  const handleLendClick = () => {
    // Handle lend button click
    console.log('Lend button clicked');
  };

  return (
    <Container>
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
