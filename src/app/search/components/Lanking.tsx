import React, { useState, useEffect, useRef } from "react";
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
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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

const Lanking = () => {
  const [dateTime, setDateTime] = useState(getCurrentDateTime());
  const [currentRankings, setCurrentRankings] = useState<string[]>([]);
  const [previousRankings, setPreviousRankings] = useState<string[]>([]);
  const [rankChanges, setRankChanges] = useState<Record<string, '▲' | '▼' | '-'>>({});
  const lastUpdateTimeRef = useRef<Date | null>(null);
  const initialLoadRef = useRef<boolean>(true);

  useEffect(() => {
    const fetchRankings = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/member/recommand', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();
      const newRankings: string[] = result.data.hotSearchRankings;

      const now = new Date();
      const lastUpdateTime = lastUpdateTimeRef.current;
      
      if (initialLoadRef.current) {
        // 첫 로딩 시 모든 항목에 '-' 설정
        const initialRankChanges: Record<string, '▲' | '▼' | '-'> = {};
        newRankings.forEach(item => {
          initialRankChanges[item] = '-';
        });

        setPreviousRankings([...newRankings]); // 현재 순위를 이전 순위로 업데이트
        setCurrentRankings(newRankings);
        setRankChanges(initialRankChanges);
        setDateTime(getCurrentDateTime());
        lastUpdateTimeRef.current = now;
        initialLoadRef.current = false;
      } else if (!lastUpdateTime || now.getTime() - lastUpdateTime.getTime() >= 60000) {
        // Calculate rank changes
        const newRankChanges: Record<string, '▲' | '▼' | '-'> = {};
        newRankings.forEach((item: string, index: number) => {
          const previousIndex = previousRankings.indexOf(item);
          if (previousIndex === -1) {
            newRankChanges[item] = '▲'; // New item, mark as new with upward arrow
          } else if (previousIndex > index) {
            newRankChanges[item] = '▲';
          } else if (previousIndex < index) {
            newRankChanges[item] = '▼';
          } else {
            newRankChanges[item] = '-';
          }
        });

        setPreviousRankings([...newRankings]); // 현재 순위를 이전 순위로 업데이트
        setCurrentRankings(newRankings);
        setRankChanges(newRankChanges);
        setDateTime(getCurrentDateTime());
        lastUpdateTimeRef.current = now;
      } else {
        // Just update the current rankings and date time
        setCurrentRankings(newRankings);
        setDateTime(getCurrentDateTime());
      }
    };

    // Fetch initial rankings
    fetchRankings();

    const intervalId = setInterval(fetchRankings, 60000);

    return () => clearInterval(intervalId);
  }, [previousRankings]);

  return (
    <Wrapper>
      <Title>지금 HOT 조회 순위는?</Title>
      <Time>{dateTime} 기준</Time>
      <RankingsContainer>
        <Column>
          {currentRankings.slice(0, 4).map((item, index) => (
            <RankItem key={index}>
              <RankNumber rank={index + 1}>{index + 1}</RankNumber>
              <RankText>{item}</RankText>
              <RankChangeIcon change={rankChanges[item]}>
                {rankChanges[item]}
              </RankChangeIcon>
            </RankItem>
          ))}
        </Column>
        <Column>
          {currentRankings.slice(4).map((item, index) => (
            <RankItem key={index + 4}>
              <RankNumber rank={index + 5}>{index + 5}</RankNumber>
              <RankText>{item}</RankText>
              <RankChangeIcon change={rankChanges[item]}>
                {rankChanges[item]}
              </RankChangeIcon>
            </RankItem>
          ))}
        </Column>
      </RankingsContainer>
    </Wrapper>
  );
};

export default Lanking;
