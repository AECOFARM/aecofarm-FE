'use client'
import React, { useEffect, useState } from "react";
import AppLayout from "@/components/layout/MobileLayout";
import NoFixedTopBar from "@/components/NoFixedTopBar";
import SearchBar from "../components/SearchBar";
import LendItemPost from "@/components/LendItemPost";
import BorrowItemPost from "@/components/BorrowItemPost";
import styled from 'styled-components';
import { usePathname } from "next/navigation";

const SearchResultsWrapper = styled.div`
  padding: 20px;
`;

interface Post {
  contractId: number;
  itemId: number;
  itemName: string;
  itemImage: string;
  itemPlace: string;
  price: number;
  time: number;
  contractTime: number;
  itemHash: string[];
  likeStatus: boolean;
  donateStatus: boolean;
  distance: number;
  lowPrice: number;
  highPrice: number;
}

interface ApiResponse {
  lendItems: Post[];
  borrowItems: Post[];
}


const SearchPage: React.FC = () => {
  const [results, setResults] = useState<ApiResponse>({
    lendItems: [],
    borrowItems: [],
  });

  const pathname = usePathname();
  const decodedPathname = decodeURIComponent(pathname);

  const query = decodedPathname.split('/').pop();
  console.log(query);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        if (query) {
          const token = localStorage.getItem('token');
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/member/search`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ keyword: query }),
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const result = await response.json();
          console.log('API response:', result); 
          setResults({
            lendItems: result.data.lendItems || [],
            borrowItems: result.data.borrowItems || [],
          });
        }
      } catch (error) {
        console.error("Fetch error: ", error);
        setResults({ lendItems: [], borrowItems: [] });
      }
    };
  
    fetchResults();
  }, [query]);
  
  

  return (
    <AppLayout>
      <NoFixedTopBar text="검색 결과" />
      <SearchBar initialData={query as string || ""} />
      <SearchResultsWrapper>
        {results.lendItems && results.lendItems.length > 0 && (
          <div>
            {results.lendItems.map((post) => (
              <LendItemPost key={post.contractId} post={post} />
            ))}
          </div>
        )}
        {results.borrowItems && results.borrowItems.length > 0 && (
          <div>
            {results.borrowItems.map((post) => (
              <BorrowItemPost key={post.contractId} post={post} />
            ))}
          </div>
        )}
        {results.lendItems.length === 0 && results.borrowItems.length === 0 && (
          <p></p>
        )}
      </SearchResultsWrapper>
    </AppLayout>
  );
};

export default SearchPage;
