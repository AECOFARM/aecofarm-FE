'use client'
import styled from 'styled-components';
import { Wrapper } from '@/components/CommonStyles';
import MyItemList from './components/MyHeartList';

const HeartList = () =>{
  return(
    <Wrapper>
      <MyItemList></MyItemList>
    </Wrapper>
  );
}

export default HeartList;