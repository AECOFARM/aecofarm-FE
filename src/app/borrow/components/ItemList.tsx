// 예시: ItemList 컴포넌트
import React from 'react';
import styled from 'styled-components';
import BorrowItemPost from '../../../components/BorrowItemPost'; // 실제 파일 위치에 맞게 수정하세요

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  color: black;
`;

const exampleData = [
  {
    "contractId": 123456,
    "itemId": 789012,
    "itemName": "게시물 제목 1",
    "itemImage": "/images/item1.jpg",
    "price": 5000,
    "itemPlace": "서울시 강남구",
    "time": 1625123456,
    "itemHash": ["태그1", "태그2", "태그3"],
    "likeStatus": true,
    "donateStatus": false,
    "distance": 10,
    "lowPrice": 2,
    "highPrice": 25
  },
  {
    "contractId": 789012,
    "itemId": 345678,
    "itemName": "게시물 제목 2",
    "itemImage": "/images/item2.jpg",
    "price": 8000,
    "itemPlace": "경기도 수원시",
    "time": 1625123456,
    "itemHash": ["태그4", "태그5", "태그6"],
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
