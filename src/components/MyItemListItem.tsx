import styled from 'styled-components';
import React from 'react';

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
  width: auto;
  height: auto;
`;

const ItemImage = styled.img<{ width: string, height: string }>`
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

const ItemInfoContainer = styled.div<{ width: string}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  p {
    color: #686868;
    font-size: 0.75rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: break-all;
  }
  .time {
    color: #686868;
    font-weight: 700;
  }
  .price {
    color: #DF5532;
    font-weight: 700;
  }
  width: ${({width}) => width};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
`;

const ItemTitle = styled.p<{width: string}>`
  font-size: 0.8rem;
  font-weight: 700;
  color: #000000;
  width: ${({width}) => width};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
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
  imageHeight: number | '100%';
  imageWidth: number | '100%';
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

  const heightStyle = typeof imageHeight === 'number' ? `${imageHeight}px` : imageHeight;
  const widthStyle = typeof imageWidth === 'number' ? `${imageWidth}px` : imageWidth;

  return (
    <ItemContainer onClick={onClick} >
      <ItemImage src={imageSrc} alt="item" width={widthStyle} height={heightStyle} />
      <ItemTitle width={widthStyle}>{itemName}</ItemTitle>
      <ItemInfoContainer width={widthStyle}>
        <p className='price'>{price} P</p>
        <p>|</p>
        <p className='time'>{time}시간</p>
      </ItemInfoContainer>
    </ItemContainer>
  )
});

export default MyItemListItem;
