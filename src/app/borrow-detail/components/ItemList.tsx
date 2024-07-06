import React from 'react';
import styled from 'styled-components';
import BorrowItemPost from '../../../components/BorrowItemPost';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;


  const exampleData = [
    {
      "contractId": 6,
      "itemId": 1,
      "itemName": "맥북 맥세이프 충전기",
      "itemImage": "",
      "price": 3000,
      "itemPlace": "경영관",
      "time": 5,
      "contractTime": 10,
      "itemHash": ["eunjeong", "맥북프로", "충전기"],
      "likeStatus": true,
      "donateStatus": false,
      "distance": 10,
      "lowPrice": 2,
      "highPrice": 25
    },
    {
      "contractId": 7,
      "itemId": 2,
      "itemName": "아이패드 에어 4",
      "itemImage": "/img/item-image.png",
      "price": 5000,
      "itemPlace": "신공학관",
      "time": 3,
      "contractTime": 10,
      "itemHash": ["jeongseon", "네고가능", "상태좋음"],
      "likeStatus": false,
      "donateStatus": true,
      "distance": 15,
      "lowPrice": 5,
      "highPrice": 30
    },
    {
      "contractId": 8,
      "itemId": 3,
      "itemName": "아이패드 에어 4",
      "itemImage": "/img/item-image.png",
      "price": 5000,
      "itemPlace": "신공학관",
      "time": 3,
      "contractTime": 10,
      "itemHash": ["jeongseon", "네고가능", "상태좋음"],
      "likeStatus": false,
      "donateStatus": true,
      "distance": 15,
      "lowPrice": 5,
      "highPrice": 30
    },
    {
      "contractId": 9,
      "itemId": 4,
      "itemName": "아이패드 에어 4",
      "itemImage": "/img/item-image.png",
      "price": 5000,
      "itemPlace": "신공학관",
      "time": 3,
      "contractTime": 10,
      "itemHash": ["jeongseon", "네고가능", "상태좋음"],
      "likeStatus": false,
      "donateStatus": true,
      "distance": 15,
      "lowPrice": 5,
      "highPrice": 30
    },
    {
      "contractId": 10,
      "itemId": 5,
      "itemName": "아이패드 에어 4",
      "itemImage": "",
      "price": 5000,
      "itemPlace": "신공학관",
      "time": 3,
      "contractTime": 10,
      "itemHash": ["jeongseon", "네고가능", "상태좋음"],
      "likeStatus": false,
      "donateStatus": true,
      "distance": 15,
      "lowPrice": 5,
      "highPrice": 30
    }
  ];

  
const ItemList = () => {
  return (
    <Container>
      {exampleData.map((post) => (
        <BorrowItemPost key={post.itemId} post={post} />
      ))}
    </Container>
  );
};

export default ItemList;
