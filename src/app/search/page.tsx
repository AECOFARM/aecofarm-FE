'use client'
import React from "react";
import styled from 'styled-components';
import AppLayout from "@/components/layout/MobileLayout";
import NoFixedTopBar from "@/components/NoFixedTopBar";
import SearchBar from "./components/SearchBar";

const SearchContainer = styled.div`
  width: 100%;
  max-width: 480px;
  height: 50px;

`;

const IconImg = styled.img`


`;

const SearchPage = () => {
  
  return (
    <AppLayout>
      <NoFixedTopBar text="검색하기"/>
      <SearchBar></SearchBar>
       

    </AppLayout>
  );
}

export default SearchPage;