import styled from 'styled-components';
import React, { useState } from 'react';

const ItemContainer = styled.div`
  .profileImage {
    border-radius: 10px;
    width: 100px;
    height: 100px;
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  padding: 5px;
  background-color: #FFFFFF;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: #EBEBEB;
  }
  position: relative;
  width: 100%;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 20px;
  }
  position: absolute;
  top: 80px;
  left: 80px;
`;

const ItemInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  p {
    color: #686868;
    font-size: 0.8rem;
    font-weight: 700;
  }
  .time {
    color: #000000;
  }
  .price {
    color: #DF5532;
  }
`;

const ItemTitle = styled.p`
  font-size: 0.8rem;
  font-weight: 700;
  color: #686868;
`;

interface Item {
  contractId: number;
  itemName: string;
  image: string;
  time: number;
  price: number;
  likeStatus: boolean;
}

interface ItemProps {
  item: Item;
}

const MyItemListItem: React.FC<ItemProps> = ({ item }) => {
  const {
    contractId,
    itemName,
    image,
    time,
    price,
    likeStatus: initialLikeStatus,
  } = item;

  const [likeStatus, setLikeStatus] = useState(initialLikeStatus);
  
  const likeIconSrc = likeStatus ? '/img/red-heart.svg' : '/img/empty-heart.svg';

  const toggleLikeStatus = () => {
    setLikeStatus(prevStatus => !prevStatus);
  }

  return (
    <ItemContainer>
      <img className='profileImage' src = {image} alt = "item" />
      <ItemInfoContainer>
        <p className='price'>{price}</p>
        <p>|</p>
        <p className='time'>{time}시간</p>
      </ItemInfoContainer>
      <ItemTitle>{itemName}</ItemTitle>
      <IconContainer>
        <img src = {likeIconSrc} alt = "like" onClick={toggleLikeStatus} />
      </IconContainer>
    </ItemContainer>
  )
}

export default MyItemListItem;
