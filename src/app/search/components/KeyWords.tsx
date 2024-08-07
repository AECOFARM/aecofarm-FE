'use client'
import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { useRouter } from 'next/navigation'; 
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
`;

const KeyWords = () => {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); 

  useEffect(() => {
    const fetchKeywords = async () => {
      const token = localStorage.getItem('token');

      const response = await fetch('/api/member/recommand', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();
      setKeywords(result.data.recommendedKeywords.slice(0, 6));
      setLoading(false);
    };

    fetchKeywords();
  }, []);

  const handleKeywordClick = (keyword: string) => {
    router.push(`/search/${encodeURIComponent(keyword)}`); 
  };

  if (loading) { 
    return <SkeletonKeyWords />;
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
}

export default KeyWords;
