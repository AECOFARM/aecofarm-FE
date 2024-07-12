'use client'
import React, {useState} from "react";
import styled from 'styled-components';
import TagInput from "./components/TagInput";
import TextInput from "./components/TextInput";
import { useRouter } from "next/navigation";
import TopBar from "@/components/TopBar";
import MainLayout from "@/components/layout/MainLayout";
import { Wrapper } from "@/components/CommonStyles";
import PostButton from "./components/PostButton";
const SelectContainer = styled.div`
  height: 30px;
  mas-width: 500px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  border-bottom: 0.5px solid var(--gray6);
  select, option {
    font-size: 0.8rem; 
    text-align: center;
    color: var(--gray6);
    width: inherit;
    height: inherit;
    background: transparent;
    border: 0 none;
    outline: 0;
  }
`;

const InputContainer = styled.div`
  width: 100%;
  padding: 25px;
  display: flex;
  flex-direction: column;
  gap: 20px;
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
    color: var(--gray6);
  }
  textarea {
    height: 100%;
    width: 100%;
    background-color: var(--white);
    border: none;
    color: var(--gray6);
    font-size: 1rem;
    &::placeholder {
      color: var(--gray4);
    }
    outline: 0;
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
  cursor: pointer;
`;

const Post = () => {
  const router = useRouter();

  const [category, setCategory] = useState("BORROW");
  const [tags, setTags] = useState<{ value: string }[]>([]);
  const [itemName, setItemName] = useState("");
  const [kakao, setKakao] = useState("");
  const [price, setPrice] = useState("");
  const [place, setPlace] = useState("");
  const [contractTime, setContractTime] = useState("");
  const [time, setTime] = useState("");
  const [itemContents, setItemContents] = useState("");

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
  };

  const handleClick = () => {
    router.push('/borrow');
    // 실제 글쓰기 시 생성된 글의 상세페이지로 가도록 수정
  };

  const handleTagsChange = (e: CustomEvent) => {
    setTags(e.detail.value);
  };


  return(
    <MainLayout>
      <TopBar text="글쓰기" />
      <Wrapper>
      <SelectContainer>
        <select value={category} onChange={handleCategoryChange}>
          <option key="빌려주고 싶어요" value="BORROW">빌려주고 싶어요</option>
          <option key="대여하고 싶어요" value="LEND">대여하고 싶어요</option>
        </select>
      </SelectContainer>
      <InputContainer>
        {category === "BORROW" && (
          <ImageInputContainer>
            <div className="image" />
          </ImageInputContainer>
        )}
        <TextInput
          placeholder="상품명"
          name="itemName"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <TextInput
          placeholder="오픈채팅방 링크"
          name="kakao"
          value={kakao}
          onChange={(e) => setKakao(e.target.value)}
        />
        <TagInput value={tags} onChange={handleTagsChange} placeholder="해시태그 입력"/>
        <TextInput
          placeholder="가격"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <TextInput
          placeholder="거래 가능 장소"
          name="place"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
        />
        <TextInput
          placeholder="거래 가능 시간"
          name="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <TextInput
          placeholder="대여 가능 시간"
          name="contractTime"
          value={contractTime}
          onChange={(e) => setContractTime(e.target.value)}
        />
        <ItemInfoContainer>
          <p>설명</p>
          <textarea placeholder="상품의 상태를 자세히 적어주세요." value={itemContents}/>
        </ItemInfoContainer>
      </InputContainer>
      <PostButtonContainer>
        <NoticeButton>상품 등록 시 유의사항을 확인하세요.</NoticeButton>
        <PostButton text="등록하기" />
      </PostButtonContainer>
    </Wrapper>
    </MainLayout>
  );
};

export default Post;