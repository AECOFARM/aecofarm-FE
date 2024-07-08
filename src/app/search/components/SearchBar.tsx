'use client'
import React from "react";
import styled from 'styled-components';
import { useState } from 'react';

const SearchContainer = styled.div`
  background-color: white;
  border: 0.5px solid var(--gray3);
  width: 90%;
  max-width: 400px;
  border-radius: 50px;
  display: flex;
  flex: 1;
  margin: 15px 20px 15px 27px;
  align-items: center;
`;

const SearchImg = styled.img`
  padding: 10px 20px;
`;

const SearchForm = styled.form`
  display: flex;
  flex: 1;
  padding: 3px;
`;


const SearchInput = styled.input`
  border: none;
  font-size: 16px;
  color: var(--gray3);
  flex: 1;
`;

const SearchButton = styled.button`
  width: 60px;
  background-color: var(--gray4);
  border-radius: 50px;
  border: 0px;
  color: white;
  padding: 7px 0;
  font-size: 15px;
  margin-left: auto;

  &:hover {
    background-color: var(--orange2);
    color: white;
  }
`;

const SearchBar = () =>  {
  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Search query:', query);
  };

  return (
    <SearchContainer>
      <SearchImg src="/img/search-icon.svg"/>
      <SearchForm onSubmit={handleSubmit}>
        <SearchInput 
          type="text" 
          value={query} 
          onChange={handleInputChange} 
          placeholder="검색어를 입력하세요" 
        />
        <SearchButton type="submit">검색</SearchButton>
      </SearchForm>
    </SearchContainer>
    
  );
}

export default SearchBar;

