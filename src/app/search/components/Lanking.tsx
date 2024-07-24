'use client'
import React, { useState, useEffect } from "react";
import styled from 'styled-components';

const initialData = {
  "code": 200,
  "message": "SUCCESS",
  "data": {
    "hotSearchRankings": []
  }
};

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

interface RankNumberProps {
  rank: number;
}

const RankNumber = styled.div<RankNumberProps>`
  font-weight: bold;
  font-size: 22px;
  margin-right: 10px;
  color: ${props => props.rank <= 3 ? 'var(--red)' : 'black'};
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


const RankText = styled.div`
  flex: 1;
`;

interface RankChangeIconProps {
  change: '▲' | '▼' | '-';
}

const RankChangeIcon = styled.div<RankChangeIconProps>`
  margin-left: 8px;
  color: ${props => props.change === '▲' ? 'var(--orange3)' : props.change === '▼' ? 'var(--blue)' : 'black'};
`;

const getCurrentDateTime = () => {
  const now = new Date();
  const date = now.toLocaleDateString();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const time = `${hours}:${minutes}`;
  return `${date} ${time}`;
};

const shuffleArray = (array: any[]) => {
  let shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const Lanking = () => {
  const [dateTime, setDateTime] = useState(getCurrentDateTime());
  const [currentRankings, setCurrentRankings] = useState<string[]>(initialData.data.hotSearchRankings);
  const [previousRankings, setPreviousRankings] = useState<string[]>([]);

  useEffect(() => {
    const fetchRankings = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/member/recommand', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();
      setCurrentRankings(result.data.hotSearchRankings);
    };

    fetchRankings();

    const intervalId = setInterval(() => {
      setPreviousRankings(currentRankings);
      setCurrentRankings(shuffleArray(currentRankings));
      setDateTime(getCurrentDateTime());
    }, 10000);

    return () => clearInterval(intervalId);
  }, [currentRankings]);

  const getRankChange = (item: string, index: number): '▲' | '▼' | '-' => {
    if (previousRankings.length === 0) return '-';

    const previousIndex = previousRankings.indexOf(item);
    if (previousIndex === -1) return '-';

    if (previousIndex > index) return '▲';
    if (previousIndex < index) return '▼';
    return '-';
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
