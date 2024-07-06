// 예시: ItemList 컴포넌트
import React from 'react';
import styled from 'styled-components';
import BorrowItemPost from '../../../components/BorrowItemPost';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;


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
