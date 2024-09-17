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
  color: var(--orange2);
  padding: 8px 20px;
  border: 1px solid var(--orange2);
  display: inline-block;
  border-radius: 20px;
  margin-right: 10px;
  margin-bottom: 10px;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: var(--orange2);
    color: white;
  }
`;

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
        setKeywords(result.data.recommendedKeywords.slice(0, 6));
      } catch (err) {
        console.error("Error fetching keywords:", err);
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
