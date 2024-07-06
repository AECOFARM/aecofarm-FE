import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  margin: 10px 20px 0;
  padding: 10px 0;
  position: relative;
  display: flex;
  max-width: 480px;
`;

const ItemImage = styled.img`
  width: 100px;
  border-radius: 10px;
`;

const ItemInfo = styled.div`
  width: 75%;
  padding: 0 10px;
`;

const Title = styled.h2`
  color: black;
  font-size: 19px;
  margin-bottom: 5px;
  font-weight: 600;
`;

const Place = styled.p`
  font-size: 15px;
  color: #666666;
  margin: 5px 0 0 0;
`;

const TimeAndPrice = styled.p`
  font-size: 15px;
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
  font-size: 14px;
`;

const LikeIcon = styled.img`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const LendButton = styled.button`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: white;
  color: #FF792E;
  padding: 10px 15px;
  border: 1px solid #DDDDDD;
  border-radius: 24px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #FF792E;
    color: white;
  }
`;

const ItemPost = ({ post }) => {
  const {
    contractId,
    itemId,
    itemName,
    itemPlace,
    price,
    time,
    itemHash,
    likeStatus: initialLikeStatus,
    donateStatus,
    distance,
    lowPrice,
    highPrice
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
        </Place>
        <HashTags>
          {itemHash.map((tag, index) => (
            <HashTag key={index}>#{tag}</HashTag>
          ))}
        </HashTags>
      </ItemInfo>
      <LikeIcon src={likeIconSrc} alt='like icon' onClick={toggleLikeStatus} />
      <LendButton onClick={handleLendClick}>빌려주기</LendButton>
    </Container>
  );
};

export default ItemPost;
