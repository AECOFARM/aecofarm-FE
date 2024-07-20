'use client'
import React, { useState, useEffect } from "react";
import styled from 'styled-components';

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
`;

const KeyWords = () => {
  const [keywords, setKeywords] = useState<string[]>([]);

  useEffect(() => {
    const fetchKeywords = async () => {
      const token = localStorage.getItem('token');

      const response = await fetch('/api/member/recommand', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();
      setKeywords(result.data.recommendedKeywords);
    };

    fetchKeywords();
  }, []);

  return (
    <Wrapper>
      <Title>아코팜 추천 키워드</Title>
      <KeyWordContainer>
        {keywords.map((keyword, index) => (
          <KeyWord key={index}>{keyword}</KeyWord>
        ))}
      </KeyWordContainer>
    </Wrapper>
  );
}

export default KeyWords;
