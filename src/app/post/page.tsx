'use client'
import React from "react";
import styled from 'styled-components';
import {useRouter} from "next/navigation";

const Wrapper = styled.div`
  min-height: 100vh;
  margin-top: 100px;
  margin-bottom: 120px;
`;

const SelectContainer = styled.div`
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  color: #686868;
  border-bottom: 0.5px solid #686868;
  select, option {
    font-size: 0.8rem; 
    text-align: center;
    color: #686868;
    width: inherit;
    height: inherit;
    background: transparent;
    border: 0 none;
  }
`;

const InputContainer = styled.div`
  width: 100%;
  padding: 25px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
`;

const ImageInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  overflow-x: auto;
  overflow-y: hidden;
  width: 100%;
  .image {
    width: 8rem;
    height: 8rem;
    border-radius: 5px;
    background-color: #999999;
  }
`;

const TextInput = styled.input`
  width: 100%;
  height: 50px;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #999999;
  background-color: #FFFFFF;
  font-size: 1rem;
  color: #999999;
`;

const PriceInputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const PriceInput = styled.input`
  width: 100%;
  height: 50px;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #999999;
  background-color: #FFFFFF;
  font-size: 1rem;
  color: #999999;
`;

const FixedText = styled.span`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none; 
  color: #999999;
`;

const ItemInfoContainer = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  margin: 10px 0;
  p {
    font-size: 1rem;
    color: #999999;
  }
  textarea {
    height: 100%;
    width: 100%;
    background-color: #FFFFFF;
    border: none;
    color: #999999;
    font-size: 1rem;
  }
`;

const PostButtonContainer = styled.div`
  max-width: 500px;
  width: 100%;
  box-shadow: 0 -2px 2px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0px;
  gap: 10px;
  position: fixed;
  bottom: 20px;
  background: #FFFFFF;
  left: 50%;
  transform: translateX(-50%);
`;

const NoticeButton = styled.p`
  font-size: 0.9rem;
  text-decoration: underline;
  color: #000000;
`;

const PostButton = styled.div`
  background-color: #7EAA92;
  width: 10rem;
  height: 3rem;
  font-size: 1.2rem;
  font-weight: 700;
  border-radius: 15px;
  color: #FFFFFF;
  text-align: center;
  padding: 12px;
`;

const Post = () => {
  return(
      <Wrapper>
      <SelectContainer>
        <select>
          <option key="대여하고 싶어요" value="latest">대여하고 싶어요</option>
          <option key="빌려주고 싶어요" value="distance">빌려주고 싶어요</option>
          <option key="학생회/동아리" value="low-price">학생회/동아리</option>
          <option key="기부하기" value="high-price">기부하기</option>
        </select>
      </SelectContainer>
      <InputContainer>
        <ImageInputContainer>
            <div className="image" />
        </ImageInputContainer>
        <TextInput type='text' placeholder="상품명"/>
        <TextInput type='text' placeholder="오픈채팅방 링크"/>
        <TextInput type='text' placeholder="# 태그"/>
        <PriceInputContainer>
          <PriceInput type = 'text' placeholder="가격"/>
          <FixedText>원 / 일</FixedText>
        </PriceInputContainer>
        <TextInput type='text' placeholder="거래 가능 장소"/>
        <TextInput type='text' placeholder="거래 가능 시간"/>
        <TextInput type='text' placeholder="대여 가능 시간"/>
        <ItemInfoContainer>
          <p>설명</p>
          <textarea placeholder="상품의 상태를 자세히 적어주세요."/>
        </ItemInfoContainer>
      </InputContainer>
      <PostButtonContainer>
        <NoticeButton>상품 등록 시 유의사항을 확인하세요.</NoticeButton>
        <PostButton>
          등록하기
        </PostButton>
      </PostButtonContainer>
      </Wrapper>
  );
};

export default Post;