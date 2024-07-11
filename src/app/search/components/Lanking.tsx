'use client'
import React, { useState, useEffect } from "react";
import styled from 'styled-components';

// 초기 JSON 데이터
const initialData = {
  "code": 200,
  "message": "SUCCESS",
  "data": {
    "hotSearchRankings": ["충전기", "마우스", "우산", "물티슈", "키보드", "A4 용지", "미적분책", "보조배터리"]
  }
};

// 스타일 컴포넌트
const Wrapper = styled.div`
  padding: 15px 35px;
`;

const Title = styled.div`
  background-color: white;
  font-size: 20px;
  font-weight: 600;
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

const RankItem = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 0;
  font-size: 19px;
  color: black;
  padding: 25px 10px;
  font-weight: 600;
`;

const RankNumber = styled.div`
  font-weight: bold;
  font-size: 22px;
  margin-right: 10px;
  color: ${props => props.rank <= 3 ? 'var(--red)' : 'black'};
`;

const RankText = styled.div`
  flex: 1;
`;

const RankChangeIcon = styled.div`
  margin-left: 8px;
  color: ${props => props.change === '▲' ? 'var(--orange3)' : props.change === '▼' ? 'var(--blue)' : 'black'};
`;

// 시간 포맷팅 함수
const getCurrentDateTime = () => {
  const now = new Date();
  const date = now.toLocaleDateString();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const time = `${hours}:${minutes}`;
  return `${date} ${time}`;
};

const shuffleArray = (array) => {
  let shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const Lanking = () => {
  const [dateTime, setDateTime] = useState(getCurrentDateTime());
  const [currentRankings, setCurrentRankings] = useState(initialData.data.hotSearchRankings);
  const [previousRankings, setPreviousRankings] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPreviousRankings(currentRankings);
      setCurrentRankings(shuffleArray(initialData.data.hotSearchRankings));
      setDateTime(getCurrentDateTime());
    }, 10000); // 10초마다 업데이트

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [currentRankings]);

  const getRankChange = (item, index) => {
    if (previousRankings.length === 0) return null;

    const previousIndex = previousRankings.indexOf(item);
    if (previousIndex === -1) return null;

    if (previousIndex > index) return '▲'; // 순위 상승
    if (previousIndex < index) return '▼'; // 순위 하락
    return '-'; // 순위 동일
  };

  return (
    <Wrapper>
      <Title>지금 HOT 검색 순위는?</Title>
      <Time>{dateTime} 기준</Time>
      <RankingsContainer>
        <Column>
          {currentRankings.slice(0, 4).map((item, index) => (
            <RankItem key={index}>
              <RankNumber rank={index + 1}>{index + 1}</RankNumber>
              <RankText>{item}</RankText>
              <RankChangeIcon change={getRankChange(item, index)}>
                {getRankChange(item, index)}
              </RankChangeIcon>
            </RankItem>
          ))}
        </Column>
        <Column>
          {currentRankings.slice(4).map((item, index) => (
            <RankItem key={index + 4}>
              <RankNumber rank={index + 5}>{index + 5}</RankNumber>
              <RankText>{item}</RankText>
              <RankChangeIcon change={getRankChange(item, index + 4)}>
                {getRankChange(item, index + 4)}
              </RankChangeIcon>
            </RankItem>
          ))}
        </Column>
      </RankingsContainer>
    </Wrapper>
  );
};

export default Lanking;
