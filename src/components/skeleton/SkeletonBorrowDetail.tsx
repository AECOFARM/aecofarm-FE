import React from "react";
import styled from "styled-components";

const SkeletonContainer = styled.div`
  background-color: white;
  border: 1px solid var(--gray3);
  padding: 20px;
  position: relative;
  max-width: 440px;
  width: 90%;
  border-radius: 10px;
  margin: 20px;
  max-height: 700px;
  margin: auto;
`;

const SkeletonItemImage = styled.div`
  width: 100%;
  max-width: 400px;
  max-height: 375px;
  margin-bottom: 20px;
  border-radius: 10px;
  border: 1px solid var(--gray3);
  background-color: var(--gray2);
  height: 300px;
`;

const SkeletonTitle = styled.div`
  width: 70%;
  height: 22px;
  background-color: var(--gray2);
  margin-bottom: 10px;
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
  margin-top: 10px;
`;

const SkeletonProfileImg = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: var(--gray2);
`;

const SkeletonProfileText = styled.div`
  width: 30%;
  height: 17px;
  background-color: var(--gray2);
  border-radius: 5px;
`;

const SkeletonButton = styled.div`
  width: 120px;
  height: 30px;
  background-color: var(--gray2);
  border-radius: 5px;
  margin: 10px 5px;
`;

const SkeletonBorrowDetail = (): JSX.Element => (
  <SkeletonContainer>
    <SkeletonItemImage />
    <SkeletonTitle />
    <SkeletonText />
    <SkeletonText />
    <SkeletonText />
    <SkeletonTags>
      <SkeletonTag />
      <SkeletonTag />
      <SkeletonTag />
    </SkeletonTags>
    <SkeletonProfile>
      <SkeletonProfileImg />
      <SkeletonProfileText />
    </SkeletonProfile>
    <SkeletonButton />
    <SkeletonButton />
  </SkeletonContainer>
);

export default SkeletonBorrowDetail;
