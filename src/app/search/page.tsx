'use client'
import React from "react";
import styled from 'styled-components';
import AppLayout from "@/components/layout/MobileLayout";
import NoFixedTopBar from "@/components/NoFixedTopBar";
import SearchBar from "./components/SearchBar";
import KeyWords from "./components/KeyWords";
import Lanking from "./components/Lanking";

const SearchPage = () => {
  return (
    <AppLayout>
      <NoFixedTopBar text="검색하기"/>
      <SearchBar />
      <KeyWords />
      <Lanking />
    </AppLayout>
  );
}

export default SearchPage;
