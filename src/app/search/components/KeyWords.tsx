'use client'
import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { useRouter } from 'next/navigation'; // useRouter 추가

const Wrapper = styled.div`
  padding: 15px 35px;
`;

const Title = styled.div`
  background-color: white;
  font-size: 20px;
  font-weight: 600;
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
  const router = useRouter(); // useRouter 훅 사용

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
    };

    fetchKeywords();
  }, []);

  const handleKeywordClick = (keyword: string) => {
    router.push(`/search/${encodeURIComponent(keyword)}`); 
  };

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
