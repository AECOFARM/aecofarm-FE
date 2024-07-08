'use client'
import React from "react";
import styled from 'styled-components';
import { useState } from 'react';

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

const KeyWords = () =>  {



  return (
    <Wrapper>
      <Title>아코팜 추천 키워드</Title>
      <KeyWordContainer>
        <KeyWord>헤드셋</KeyWord>
        <KeyWord>헤드셋</KeyWord>
        <KeyWord>헤드셋</KeyWord>
        <KeyWord>헤드셋</KeyWord>
        <KeyWord>헤드셋</KeyWord>
        <KeyWord>헤드셋</KeyWord>
      </KeyWordContainer>
    </Wrapper>
  
  );
}

export default KeyWords;

