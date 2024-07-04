import React from "react";
import styled from "styled-components";

const ItemPreviewContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
  .itemImage {
    width: 6rem;
    height: 6rem;
    border-radius: 10px;
  }
`;

const ItemInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`;

const ItemName = styled.p`
  font-size: 1.1rem;
  font-weight: 700;
  color: #000000;
`;

const ItemHashTags = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 5px;
  text-overflow: ellipsis;
`;

const ItemHashTag = styled.p`
  color: #FF9B3F;
  font-size: 0.7rem;
  white-space: nowrap;
`;

const TimeAndPrice = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-items: flex-start;
  p {
    font-size: 0.7rem;
    color: #999999;
  }
`;

const PlaceAndContract = styled.div`
  display: flex;
  flex-direction: row;
  align-item: center;
  flex-direction: center;
  justify-content: center;
  gap: 5px;
  align-items: flex-start;
`;

const ItemPlace = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 5px;
  p {
    font-size: 0.7rem;
    color: #999999;
  }
`;

const ItemContractTime = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 5px;
  p {
    font-size: 0.7rem;
    color: #999999;
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 15px;
  }
`;

interface Item {
    itemName : string;
    image : string;
    price : number;
    itemPlace : string;
    time : number;
    contractTime : number;
    itemHash : string[];
}

interface ItemProps {
    item: Item;
}

const ItemPreview: React.FC<ItemProps> = ({item}) => {
  const {
    itemName,
    image,
    price,
    itemPlace,
    time,
    contractTime,
    itemHash,
  } = item;

  return (
    <ItemPreviewContainer>
        <img className="itemImage" src = {image} />
        <ItemInfoContainer>
            <ItemName>{itemName}</ItemName>
            <ItemHashTags>
                {itemHash.map((tag, index) => (
                    <ItemHashTag key={index}>#{tag}</ItemHashTag>
                ))}
            </ItemHashTags>
            <TimeAndPrice>
                <p>{time}시간</p>
                <p>|</p>
                <p>{price}원</p>
            </TimeAndPrice>
            <PlaceAndContract>
              <ItemPlace>
                <IconContainer>
                    <img src = "/img/location-pin.svg" />
                </IconContainer>
                <p>{itemPlace}</p>
              </ItemPlace>
              <ItemContractTime>
                <IconContainer>
                  <img src = "/clock.svg" />
                </IconContainer>
                <p>{contractTime}분 이내 거래 가능</p>
              </ItemContractTime>
            </PlaceAndContract>
            
        </ItemInfoContainer>
    </ItemPreviewContainer>
  );
}

export default ItemPreview;
