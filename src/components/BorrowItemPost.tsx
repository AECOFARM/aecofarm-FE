import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  padding: 15px 15px;
  position: relative;
  display: flex;
  max-width: 480px;
  width: 100%;
  justify-content: center;
`;

const ItemImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 10px;
`;

const ItemInfo = styled.div`
  width: 75%;
  padding: 0 15px;
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

const HashTags = styled.div`

`;

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
  right: 20px;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;


const BorrowItemPost = ({ post }) => {
  const {
    contractId,
    itemName,
    itemImage,
    itemPlace,
    price,
    time,
    contractTime,
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

  let imageSrc = itemImage;
  if (!imageSrc) {
    imageSrc = "/img/default-image.png";
  }

  return (
    <Container>
      <ItemImage src={imageSrc} alt={itemName} />
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
    </Container>
  );
};

export default BorrowItemPost;
