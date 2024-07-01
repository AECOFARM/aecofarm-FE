import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  margin: 10px 20px 0;
  padding: 10px 0;
  position: relative;
  display: flex;
`;

const ItemImage = styled.img`
  width: 100px;
  border-radius: 10px;
`;

const ItemInfo = styled.div`
  width: 60%;
  padding: 0 10px;
`;

const Title = styled.h2`
  font-size: 19px;
  margin-bottom: 10px;
`;

const Place = styled.p`
  font-size: 13px;
  color: #666666;
  margin: 5px 0;
`;

const Price = styled.p`
  font-size: 14px;
  color: #000000;
`;

const ItemPost = ({ post }) => {
  const {
    itemName,
    itemPlace,
    price,
    itemImage,
    likeStatus,
    donateStatus,
    distance,
    lowPrice,
    highPrice
  } = post;

  return (
    <Container>

      <ItemImage src='img/item-image.png' alt='item-image'/>

      <ItemInfo>
        <Title>{itemName}</Title>
        <Price>가격: {price}P</Price>
        <Place>장소: {itemPlace}</Place>

      </ItemInfo>
     
    </Container>
  );
};

export default ItemPost;
