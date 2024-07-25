import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 15px 35px;
`;

const Title = styled.div`
  background-color: white;
  font-size: 20px;
  font-weight: 600;
  color: black;
`;

const Time = styled.div`
  font-size: 17px;
  color: var(--gray5);
  margin: 10px 0;
`;

const RankingsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Column = styled.div`
  width: 48%;
`;

const SkeletonRankItem = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 0;
  padding: 25px 10px;
  background-color: white;
  border-radius: 10px;
`;

const SkeletonRankNumber = styled.div`
  width: 30px;
  height: 30px;
  background-color: var(--gray2);
  border-radius: 50%;
  margin-right: 10px;
`;

const SkeletonRankText = styled.div`
  flex: 1;
  height: 20px;
  background-color: var(--gray2);
  border-radius: 5px;
`;

const SkeletonRankChangeIcon = styled.div`
  width: 20px;
  height: 20px;
  background-color: var(--gray2);
  border-radius: 50%;
  margin-left: 8px;
`;

const SkeletonLanking = () => {
  return (
    <Wrapper>
      <Title>지금 HOT 조회 순위는?</Title>
      <Time>Loading...</Time>
      <RankingsContainer>
        <Column>
          {Array.from({ length: 4 }).map((_, index) => (
            <SkeletonRankItem key={index}>
              <SkeletonRankNumber />
              <SkeletonRankText />
              <SkeletonRankChangeIcon />
            </SkeletonRankItem>
          ))}
        </Column>
        <Column>
          {Array.from({ length: 4 }).map((_, index) => (
            <SkeletonRankItem key={index + 4}>
              <SkeletonRankNumber />
              <SkeletonRankText />
              <SkeletonRankChangeIcon />
            </SkeletonRankItem>
          ))}
        </Column>
      </RankingsContainer>
    </Wrapper>
  );
};

export default SkeletonLanking;
