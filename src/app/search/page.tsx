'use client'
import React from "react";
import styled from 'styled-components';
import AppLayout from "@/components/layout/MobileLayout";
import NoFixedTopBar from "@/components/NoFixedTopBar";
import SearchBar from "./components/SearchBar";
import KeyWords from "./components/KeyWords";



const SearchPage = () => {
  
  return (
    <AppLayout>
      <NoFixedTopBar text="검색하기"/>
        <SearchBar/>
        <KeyWords/>
       

    </AppLayout>
  );
}

export default SearchPage;