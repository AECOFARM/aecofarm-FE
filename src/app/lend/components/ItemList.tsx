// 예시: ItemList 컴포넌트
import React from 'react';
import styled from 'styled-components';
import LendItemPost from '../../../components/LendItemPost'; 

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const exampleData = [
  {
    "contractId": 123456,
    "itemId": 789012,
    "itemName": "게시물 제목 1",
    "price": 5000,
    "itemPlace": "서울시 강남구",
    "time": 1625123456,
    "contractTime": 10,
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
    "price": 8000,
    "itemPlace": "경기도 수원시",
    "time": 1625123456,
    "contractTime": 10,
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
        <LendItemPost key={post.itemId} post={post} buttonVisible={true}/>
      ))}
    </Container>
  );
};

export default ItemList;
