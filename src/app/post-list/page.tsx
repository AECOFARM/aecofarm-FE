'use client'
import styled from 'styled-components';
import { Wrapper } from '@/components/CommonStyles';
import MyItemList from './components/MyPostList';


const PostList = () =>{
  return(
    <Wrapper>
      <MyItemList />
    </Wrapper>
  );
}

export default PostList;