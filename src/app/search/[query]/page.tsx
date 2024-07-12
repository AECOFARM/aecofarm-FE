'use client'
import SearchResults from "../components/SearchResult"; 
import AppLayout from "@/components/layout/MobileLayout";
import SearchBar from "../components/SearchBar";
import NoFixedTopBar from "@/components/NoFixedTopBar";

const SearchPage: React.FC = () => {
  return (
    <AppLayout>
      <NoFixedTopBar text="검색 결과"></NoFixedTopBar>
      <SearchBar></SearchBar>
      <SearchResults />
    </AppLayout>
    

  );
  
  
};

export default SearchPage;
