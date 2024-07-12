"use client"
import styled from "styled-components";
import React, {useState, useEffect} from "react";
import { useRouter, useParams } from "next/navigation";
import TextInput from "../../components/TextInput";
import TagInput from "../../components/TagInput";
import MainLayout from "@/components/layout/MainLayout";
import { Wrapper } from "@/components/CommonStyles";
import TopBar from "@/components/TopBar";
import PostButton from "../../components/PostButton";

interface ItemDetail {
    category: string,
    contractId: number;
    userName: string;
    itemName: string;
    itemContents: string;
    kakao: string;
    itemImage: string;
    price: number;
    itemPlace: string;
    time: number;
    contractTime: number;
    itemHash: string[];
    likeStatus: boolean;
    donateStatus: boolean;
  }

const exampleData: ItemDetail[] = [
    {
        "category" : "BORROW",
        "contractId": 123456,
        "userName": "이정선",
        "itemName": "맥북 맥세이프 충전기",
        "itemContents": "상태 최상. 아이폰, 갤럭시 동시에 충전 가능!",
        "kakao": "https://open.kakao.com/o/s37YOrBg",
        "itemImage": "",
        "price": 0,
        "itemPlace": "경영관",
        "time": 5,
        "contractTime": 10,
        "itemHash": ["eunjeong", "맥북프로", "충전기"],
        "likeStatus": true,
        "donateStatus": true
    },
    {
        "category" : "BORROW",
        "contractId": 789012,
        "userName": "이정선",
        "itemName": "아이패드 에어 4",
        "itemImage": "/img/item-image.png",
        "itemContents": "상태 최상. 아이폰, 갤럭시 동시에 충전 가능!",
        "kakao": "https://open.kakao.com/o/s37YOrBg",
        "price": 5000,
        "itemPlace": "신공학관",
        "time": 3,
        "contractTime": 10,
        "itemHash": ["jeongseon", "네고가능", "상태좋음"],
        "likeStatus": false,
        "donateStatus": false,
    },
    {
        "category" : "BORROW",
        "contractId": 789013,
        "userName": "이정선",
        "itemName": "아이패드 에어 4",
        "itemImage": "/img/item-image.png",
        "itemContents": "상태 최상. 아이폰, 갤럭시 동시에 충전 가능!",
        "kakao": "https://open.kakao.com/o/s37YOrBg",
        "price": 5000,
        "itemPlace": "신공학관",
        "time": 3,
        "contractTime": 10,
        "itemHash": ["jeongseon", "네고가능", "상태좋음"],
        "likeStatus": false,
        "donateStatus": false,
    },
    {
        "category" : "BORROW",
        "contractId": 789014,
        "userName": "이정선",
        "itemName": "아이패드 에어 4",
        "itemImage": "/img/item-image.png",
        "itemContents": "상태 최상. 아이폰, 갤럭시 동시에 충전 가능!",
        "kakao": "https://open.kakao.com/o/s37YOrBg",
        "price": 0,
        "itemPlace": "신공학관",
        "time": 3,
        "contractTime": 10,
        "itemHash": ["jeongseon", "네고가능", "상태좋음"],
        "likeStatus": false,
        "donateStatus": true,
    },
    {
        "category" : "BORROW",
        "contractId": 789015,
        "userName": "이정선",
        "itemName": "아이패드 에어 4",
        "itemContents": "상태 최상. 아이폰, 갤럭시 동시에 충전 가능!",
        "kakao": "https://open.kakao.com/o/s37YOrBg",
        "itemImage": "",
        "price": 0,
        "itemPlace": "신공학관",
        "time": 3,
        "contractTime": 10,
        "itemHash": ["jeongseon", "네고가능", "상태좋음"],
        "likeStatus": false,
        "donateStatus": true,
    }
  ];

const UpdatePost = () => {

  const router = useRouter();

  const { contractId } = useParams() as { contractId: string };
  const [itemDetail, setItemDetail] = useState<ItemDetail | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [tags, setTags] = useState<{ value: string }[]>([]);
  const [value, setValue] = useState("");
  const [hasHashWrapInner, setHasHashWrapInner] = useState(false);

  useEffect(() => {
    const hashWrapInnerElements = document.querySelectorAll(".HashWrapInner");
    setHasHashWrapInner(hashWrapInnerElements.length > 0);
  }, [value]);

  const handleTagsChange = (e: CustomEvent) => {
    setTags(e.detail.value);
  };
  
  useEffect(() => {
    if(!contractId)
      return;
    
    const fetchItemInfo = () => {
      const currentItem = exampleData.find(
        (item) => item.contractId === Number(contractId)
      );
      setItemDetail(currentItem || null);
      setCategory(currentItem?.category || null);
      if (currentItem) {
        setTags(currentItem.itemHash.map((tag) => ({ value: tag })));
      }
    };
    fetchItemInfo();
  }, [contractId]);

  if (!itemDetail) return <div>Loading...</div>;
  
  return(
    <MainLayout>
      <TopBar text="글 수정하기" />
      <Wrapper>
        <Category>
          {category === "BORROW" ? (
            <p>빌려주고 싶어요</p>
           ) : (
            <p>빌리고 싶어요</p>
           )}
        </Category>
        <InputContainer>
        {category === "BORROW" && (
          <ImageInputContainer>
            <div className="image" />
          </ImageInputContainer>
        )}
        <TextInput
          placeholder="상품명"
          name="itemName"
          value={itemDetail.itemName}
          onChange={(e) => setItemDetail(e.target.value)}
        />
        <TextInput
          placeholder="오픈채팅방 링크"
          name="kakao"
          value={itemDetail.kakao}
          onChange={(e) => setItemDetail(e.target.value)}
        />

        <TagInput value={tags} onChange={handleTagsChange} placeholder="해시태그 입력" />
        <TextInput
          placeholder="가격"
          name="price"
          value={itemDetail.price}
          onChange={(e) => setItemDetail(e.target.value)}
        />
        <TextInput
          placeholder="거래 가능 장소"
          name="itemPlace"
          value={itemDetail.itemPlace}
          onChange={(e) => setItemDetail(e.target.value)}
        />
        <TextInput
          placeholder="거래 가능 시간"
          name="time"
          value={itemDetail.time}
          onChange={(e) => setItemDetail(e.target.value)}
        />
        <TextInput
          placeholder="대여 가능 시간"
          name="contractTime"
          value={itemDetail.contractTime}
          onChange={(e) => setItemDetail(e.target.value)}
        />
        <ItemInfoContainer>
          <p>설명</p>
          <textarea placeholder="상품의 상태를 자세히 적어주세요." defaultValue={itemDetail.itemContents}/>
        </ItemInfoContainer>
        </InputContainer>
      <PostButton text="수정하기"/>
      </Wrapper>
    </MainLayout>
  );
};

const Category = styled.div`
  font-size: 0.8rem;
  height: 30px;
  color: var(--black);
  border-bottom: 1px solid var(--gray6);
  max-width: 500px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputContainer = styled.div`
  width: 100%;
  padding: 25px;
  display: flex;
  flex-direction: column;
  gap: 25px;
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

export default UpdatePost;