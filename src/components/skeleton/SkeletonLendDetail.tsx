import React from 'react';
import styled from 'styled-components';

const SkeletonContainer = styled.div`
  background-color: white;
  border: 1px solid var(--gray3);
  padding: 30px;
  position: relative;
  max-width: 440px;
  width: 90%;
  border-radius: 10px;
  margin: 40px 20px;
  max-height: 700px;
  margin: auto;
`;

const SkeletonTitle = styled.div`
  width: 70%;
  height: 25px;
  background-color: var(--gray2);
  margin-bottom: 15px;
  border-radius: 5px;
`;

const SkeletonText = styled.div`
  width: 100%;
  height: 17px;
  background-color: var(--gray2);
  margin-bottom: 10px;
  border-radius: 5px;
`;

const SkeletonTags = styled.div`
  display: flex;
  gap: 5px;
  margin-top: 10px;
`;

const SkeletonTag = styled.div`
  width: 50px;
  height: 15px;
  background-color: var(--gray2);
  border-radius: 5px;
`;

const SkeletonProfile = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px 0;
`;

const SkeletonProfileImg = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--gray2);
`;

const SkeletonProfileText = styled.div`
  width: 20%;
  height: 20px;
  background-color: var(--gray2);
  border-radius: 5px;
`;

const SkeletonButton = styled.div`
  width: 120px;
  height: 20px;
  background-color: var(--gray2);
  border-radius: 5px;
  margin: 20px 5px;
`;

const SkeletonLendDetail = () => (
  <SkeletonContainer>
    <SkeletonTitle />
    <SkeletonProfile>
      <SkeletonProfileImg />
      <SkeletonProfileText />
    </SkeletonProfile>
    <SkeletonText />
    <SkeletonText />
    <SkeletonTags>
      <SkeletonTag />
      <SkeletonTag />
      <SkeletonTag />
    </SkeletonTags>
    <SkeletonButton />
    <SkeletonButton />
  </SkeletonContainer>
);

export default SkeletonLendDetail;
