import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 15px 35px;
`;

const Title = styled.div`
  background-color: white;
  font-size: 20px;
  font-weight: 600;
  color: black;
  margin-bottom: 15px;
`;

const SkeletonKeyWordContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const SkeletonKeyWord = styled.div`
  background-color: var(--gray2);
  height: 35px;
  width: 80px;
  border-radius: 20px;
`;

const SkeletonKeyWords = (): JSX.Element => {
  return (
    <Wrapper>
      <Title>아코팜 추천 키워드</Title>
      <SkeletonKeyWordContainer>
        {Array.from({ length: 6 }).map((_, index) => (
          <SkeletonKeyWord key={index} />
        ))}
      </SkeletonKeyWordContainer>
    </Wrapper>
  );
};

export default SkeletonKeyWords;
