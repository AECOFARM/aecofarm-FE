// pages/search.tsx
'use client'
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AppLayout from "@/components/layout/MobileLayout";
import NoFixedTopBar from "@/components/NoFixedTopBar";
import SearchBar from "../components/SearchBar";
import styled from 'styled-components';
import { usePathname } from "next/navigation";

const SearchResultsWrapper = styled.div`
  padding: 20px;
`;

const ResultItem = styled.div`
  border-bottom: 1px solid #eee;
  padding: 10px 0;
`;

const SearchPage: React.FC = () => {
  const [results, setResults] = useState([]);
  const pathname = usePathname();
  const decodedPathname = decodeURIComponent(pathname);

  const query = decodedPathname.split('/').pop();
  console.log(query)

  useEffect(() => {
    const fetchResults = async () => {
      if (query) {
        const token = localStorage.getItem('token');
        const response = await fetch(`/api/member/search`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query }),
        });
        const data = await response.json();
        setResults(data.results); 
      }
    };

    fetchResults();
  }, [query]);

  return (
    <AppLayout>
      <NoFixedTopBar text="검색 결과" />
      <SearchBar initialData={query as string || ""} />
      <SearchResultsWrapper>
        {results && results.length > 0 ? (
          results.map((result, index) => (
            <ResultItem key={index}>
              {/* Customize the result item display */}
              {result.name} {/* Adjust according to your API response */}
            </ResultItem>
          ))
        ) : (
          <p>No results found</p>
        )}
      </SearchResultsWrapper>
    </AppLayout>
  );
};

export default SearchPage;
