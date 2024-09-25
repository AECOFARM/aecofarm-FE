"use client";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import SkeletonKeyWords from "@/components/skeleton/SkeletonKeyWords";

const Wrapper = styled.div`
  padding: 15px 35px;
`;

const Title = styled.div`
  background-color: white;
  font-size: 20px;
  font-weight: 600;
  color: black;
`;

const KeyWordContainer = styled.div`
  margin: 15px 0;
`;

const KeyWord = styled.div`
  color: ${({ theme }) => theme.colors.orange2};
  padding: 8px 20px;
  border: 1px solid ${({ theme }) => theme.colors.orange2};
  display: inline-block;
  border-radius: 20px;
  margin-right: 10px;
  margin-bottom: 10px;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.orange2};
    color: white;
  }
`;

// 임시 키워드 데이터 추가
const mockKeywords = [
  "스마트 농업",
  "AI 기반 서비스",
  "IoT",
  "친환경 기술",
  "드론 농업",
  "자율주행 농기계",
];

const KeyWords: React.FC = () => {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchKeywords = async (): Promise<void> => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Authentication token is missing.");
          setLoading(false);
          return;
        }

        const response = await fetch("/api/member/recommand", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch keywords.");
        }

        const result = await response.json();

        // 만약 받아온 데이터가 비어있을 경우 mock 데이터 사용
        const fetchedKeywords = result.data?.recommendedKeywords || [];
        if (fetchedKeywords.length === 0) {
          setKeywords(mockKeywords);
        } else {
          setKeywords(fetchedKeywords.slice(0, 6));
        }
      } catch (err) {
        console.error("Error fetching keywords:", err);
        // 오류가 발생했을 경우에도 mock 데이터를 사용
        setKeywords(mockKeywords);
      } finally {
        setLoading(false);
      }
    };

    fetchKeywords().catch((err) => console.error("Fetch Keywords Error:", err));
  }, []);

  const handleKeywordClick = (keyword: string): void => {
    router.push(`/search/${encodeURIComponent(keyword)}`);
  };

  if (loading) {
    return <SkeletonKeyWords />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Wrapper>
      <Title>아코팜 추천 키워드</Title>
      <KeyWordContainer>
        {keywords.map((keyword, index) => (
          <KeyWord key={index} onClick={() => handleKeywordClick(keyword)}>
            {keyword}
          </KeyWord>
        ))}
      </KeyWordContainer>
    </Wrapper>
  );
};

export default KeyWords;
