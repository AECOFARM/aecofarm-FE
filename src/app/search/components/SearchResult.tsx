'use client'
import React from "react";
import { useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import styled from 'styled-components';
import Category from "@/components/Category";

const ResultsWrapper = styled.div`
  max-width: 450px;
  padding: 0 20px;
`;

const ResultItem = styled.div`
  margin: 10px 0;
  padding: 15px;
  border: 1px solid var(--gray3);
  border-radius: 5px;
`;

const SearchResults: React.FC = () => {
  const params = useSearchParams();
  const query = params.get('query');

  // For now, just mock some search results
  const mockResults = [
    "Result 1",
    "Result 2",
    "Result 3",
    "Result 4"
  ];

  const [selectedCategory, setSelectedCategory] = useState<string>("전체");

  const handleSelectCategory = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  return (
    <ResultsWrapper>
      <Category selectedCategory={selectedCategory} onSelectCategory={handleSelectCategory}></Category>
      <h1>{query}</h1>
      {mockResults.map((result, index) => (
        <ResultItem key={index}>{result}</ResultItem>
      ))}
    </ResultsWrapper>
  );
};

export default SearchResults;
