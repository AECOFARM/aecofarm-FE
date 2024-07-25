import React from 'react';
import styled from 'styled-components';

const SkeletonContainer = styled.div`
  background-color: white;
  border-bottom: 1px solid var(--gray3);
  padding: 10px 10px;
  display: flex;
  max-width: 480px;
  width: 100%;
  cursor: pointer;
`;

const SkeletonItemInfo = styled.div`
  width: 90%;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SkeletonTitle = styled.div`
  width: 70%;
  height: 19px;
  background-color: var(--gray2);
  margin-bottom: 5px;
  border-radius: 5px;
`;

const SkeletonText = styled.div`
  width: 50%;
  height: 14px;
  background-color: var(--gray2);
  margin-bottom: 5px;
  border-radius: 5px;
`;

const SkeletonPlace = styled.div`
  display: flex;
  align-items: center;

  div {
    width: 100px;
    height: 13px;
    background-color: var(--gray2);
    border-radius: 5px;
  }
`;

const SkeletonTags = styled.div`
  display: flex;
  gap: 5px;
  margin-top: 5px;
`;

const SkeletonTag = styled.div`
  width: 50px;
  height: 13px;
  background-color: var(--gray2);
  border-radius: 5px;
`;

const SkeletonLendItemPost = () => (
  <SkeletonContainer>
    <SkeletonItemInfo>
      <SkeletonTitle />
      <SkeletonText />
      <SkeletonPlace>
        <div />
      </SkeletonPlace>
      <SkeletonTags>
        <SkeletonTag />
        <SkeletonTag />
        <SkeletonTag />
      </SkeletonTags>
    </SkeletonItemInfo>
  </SkeletonContainer>
);

export default SkeletonLendItemPost;
