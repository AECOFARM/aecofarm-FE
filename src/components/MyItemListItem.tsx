import styled from 'styled-components';
import React, { useState } from 'react';
import {useRouter} from 'next/navigation';
import axios from 'axios';

interface Item {
  contractId: number;
  itemName: string;
  itemImage: string;
  time: number;
  price: number;
  likeStatus?: boolean;
}


const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3px;
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

const ProfileImage = styled.img<{ width: string, height: string }>`
  border-radius: 10px;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  aspect-ratio: 1 / 1; /* Width와 Height를 동일하게 유지 */
`;

const IconContainer = styled.div<{ visible: boolean }>`
  display: ${({ visible }) => (visible ? 'flex' : 'none')};
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
    font-size: 0.75rem;
  }
  .time {
    color: #686868;
    font-weight: 700;
  }
  .price {
    color: #DF5532;
    font-weight: 700;
  }
`;

const ItemTitle = styled.p`
  font-size: 0.8rem;
  font-weight: 700;
  color: #000000;
`;

interface Item {
  contractId: number;
  itemName: string;
  itemImage: string;
  time: number;
  price: number;
  likeStatus?: boolean;
}

interface ItemProps {
  item: Item;
  onClick: () => void;
  imageWidth: string;
  imageHeight: string;
}

const MyItemListItem: React.FC<ItemProps> = React.memo(({ item, onClick, imageHeight, imageWidth }) => {
  const {
    contractId,
    itemName,
    itemImage,
    time,
    price,
    likeStatus: initialLikeStatus,
  } = item;

  let imageSrc = itemImage;
  if (!imageSrc) {
    imageSrc = item.itemImage || "/img/default-image.png";

  }

  return (
    <ItemContainer onClick={onClick}>
      <ProfileImage src={imageSrc} alt="item" width={imageWidth} height={imageHeight} />
      <ItemTitle>{itemName}</ItemTitle>
      <ItemInfoContainer>
        <p className='price'>{price} P</p>
        <p>|</p>
        <p className='time'>{time}시간</p>
      </ItemInfoContainer>
    </ItemContainer>
  )
});

export default MyItemListItem;
