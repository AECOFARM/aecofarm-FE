import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import SkeletonLanking from "@/components/skeleton/SkeletonLanking";

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
  color: ${({ theme }) => theme.colors.gray5};
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
  color: ${(props) =>
    props.rank <= 3
      ? "${({ theme }) => theme.colors.red}"
      : "${({ theme }) => theme.colors.black}"};
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
  change: "▲" | "▼" | "-";
}

const RankChangeIcon = styled.div<RankChangeIconProps>`
  margin-left: 8px;
  color: ${(props) =>
    props.change === "▲"
      ? "${({ theme }) => theme.colors.orange3}"
      : props.change === "▼"
        ? "${({ theme }) => theme.colors.blue}"
        : "${({ theme }) => theme.colors.black}"};
`;

const getCurrentDateTime = (): string => {
  const now = new Date();
  const date = now.toLocaleDateString();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const time = `${hours}:${minutes}`;
  return `${date} ${time}`;
};

// 임시 랭킹 데이터 추가
const mockRankings = [
  "스마트 농업",
  "AI 서비스",
  "친환경 기술",
  "자율주행 농기계",
  "드론",
  "클라우드 기반 농업",
  "IoT 센서",
  "빅데이터 분석",
];

const Lanking = (): JSX.Element => {
  const [dateTime, setDateTime] = useState<string>(getCurrentDateTime());
  const [currentRankings, setCurrentRankings] = useState<string[]>([]);
  const [previousRankings, setPreviousRankings] = useState<string[]>([]);
  const [rankChanges, setRankChanges] = useState<
    Record<string, "▲" | "▼" | "-">
  >({});
  const [loading, setLoading] = useState<boolean>(true);
  const lastUpdateTimeRef = useRef<Date | null>(null);
  const initialLoadRef = useRef<boolean>(true);

  useEffect(() => {
    const fetchRankings = async (): Promise<void> => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("/api/member/recommand", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();
        const newRankings: string[] = result.data.hotSearchRankings || [];

        if (newRankings.length === 0) {
          // 데이터가 없을 경우 mock 데이터를 사용
          setCurrentRankings(mockRankings);
          setPreviousRankings(mockRankings);
          return;
        }

        const now = new Date();
        const lastUpdateTime = lastUpdateTimeRef.current;

        if (initialLoadRef.current) {
          const initialRankChanges: Record<string, "▲" | "▼" | "-"> = {};
          newRankings.forEach((item) => {
            initialRankChanges[item] = "-";
          });

          setPreviousRankings([...newRankings]);
          setCurrentRankings(newRankings);
          setRankChanges(initialRankChanges);
          setDateTime(getCurrentDateTime());
          lastUpdateTimeRef.current = now;
          initialLoadRef.current = false;
        } else if (
          !lastUpdateTime ||
          now.getTime() - lastUpdateTime.getTime() >= 60000
        ) {
          const newRankChanges: Record<string, "▲" | "▼" | "-"> = {};
          newRankings.forEach((item: string, index: number) => {
            const previousIndex = previousRankings.indexOf(item);
            if (previousIndex === -1) {
              newRankChanges[item] = "▲";
            } else if (previousIndex > index) {
              newRankChanges[item] = "▲";
            } else if (previousIndex < index) {
              newRankChanges[item] = "▼";
            } else {
              newRankChanges[item] = "-";
            }
          });

          setPreviousRankings([...newRankings]);
          setCurrentRankings(newRankings);
          setRankChanges(newRankChanges);
          setDateTime(getCurrentDateTime());
          lastUpdateTimeRef.current = now;
        } else {
          setCurrentRankings(newRankings);
          setDateTime(getCurrentDateTime());
        }
      } catch (error) {
        console.error("Failed to fetch rankings:", error);
        // 오류 발생 시 mock 데이터 사용
        setCurrentRankings(mockRankings);
        setPreviousRankings(mockRankings);
      } finally {
        setLoading(false);
      }
    };

    fetchRankings();

    const intervalId = setInterval(fetchRankings, 60000);

    return () => clearInterval(intervalId);
  }, [previousRankings]);

  if (loading) {
    return <SkeletonLanking />;
  }

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
