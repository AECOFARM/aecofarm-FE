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
import axios from "axios";

interface ItemDetail {
    owner: boolean;
    userName: string;
    itemName: string;
    price: number;
    itemImage?: string;
    itemContents: string;
    itemPlace: string;
    itemHash: string[];
    time: number;
    contractTime: number;
    kakao: string;
    category?: string;
    file?: File;
  }

const exampleData: ItemDetail[] = [
    
  ];

const UpdatePost = () => {


  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { contractId } = useParams() as { contractId: string };
  const [itemDetail, setItemDetail] = useState<ItemDetail>({
    owner: false,
    userName: "",
    itemName: "",
    price: 0,
    itemContents: "",
    itemPlace: "",
    itemHash: [],
    time: 0,
    contractTime: 0,
    kakao: "",
    itemImage: "",
    file: undefined,
  });
  const [category, setCategory] = useState<string | null>(null);
  const [tags, setTags] = useState<{ value: string }[]>([]);
  const [value, setValue] = useState("");
  const [hasHashWrapInner, setHasHashWrapInner] = useState(false);

  const updatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    const updateContract = JSON.stringify({
      category: itemDetail?.category,
      itemName: itemDetail?.itemName,
      kakao: itemDetail?.kakao,
      itemHash: itemDetail?.itemHash,
      time: itemDetail?.time,
      contractTime: itemDetail?.contractTime,
      price: itemDetail?.price,
      itemPlace: itemDetail?.itemPlace,
      itemContents: itemDetail?.itemContents
    });

    const blob = new Blob([updateContract], {
      type: 'application/json'
    });

    const formData = new FormData();
    formData.append('updateContract', blob);

    if (itemDetail?.file) {
      formData.append('file', itemDetail.file);
    } else {
      const emptyFile = new File([""], "empty.txt", {type: "text/plain"});
      formData.append('file', emptyFile);
      // formData.append('file', ''); 로 수정
    }

    try {
      setError(null);
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.put(`/api/contract/update/${contractId}`, formData, {
        headers : {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response);
      router.push("/borrow"); // 디테일 페이지로 수정
    } catch(err) {
      const errorMessage = (err as Error).message || 'Something went wrong';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const hashWrapInnerElements = document.querySelectorAll(".HashWrapInner");
    setHasHashWrapInner(hashWrapInnerElements.length > 0);
  }, [value]);

  const handleTagsChange = (e: CustomEvent) => {
    setTags(e.detail.value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setItemDetail(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  useEffect(() => {
    if(!contractId)
      return;
    
    const fetchItemInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        const responce = await axios.get(`https://port-0-aecofarm-lyhj20nc49bb1c32.sel5.cloudtype.app/contract/detail/${contractId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const currentItem = responce.data;
        setItemDetail(currentItem);
        setCategory(currentItem?.category || null);
        if (currentItem.itemHash) {
          setTags(currentItem.itemHash.map((tag: string) => ({ value: tag })));
        }
      } catch (err) {
        const errorMessage = (err as Error).message || 'Something went wrong';
          setError(errorMessage);
      }
    };
    fetchItemInfo();
  }, [contractId]);

  if (!itemDetail) return <div>contractId를 확인하세요</div>;

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
        <InputContainer onSubmit={updatePost}>
        {category === "BORROW" && (
          <ImageInputContainer>
            <div className="image" />
          </ImageInputContainer>
        )}
        <TextInput
          placeholder="상품명"
          name="itemName"
          value={itemDetail.itemName}
          onChange={handleInputChange}
        />
        <TextInput
          placeholder="오픈채팅방 링크"
          name="kakao"
          value={itemDetail.kakao}
          onChange={handleInputChange}
        />
        <TagInput value={itemDetail.itemHash} onChange={handleTagsChange} placeholder="해시태그 입력" />
        <TextInput
          placeholder="가격"
          name="price"
          value={String(itemDetail.price)}
          onChange={handleInputChange}
        />
        <TextInput
          placeholder="거래 가능 장소"
          name="itemPlace"
          value={itemDetail.itemPlace}
          onChange={handleInputChange}
        />
        <TextInput
          placeholder="거래 가능 시간"
          name="contractTime"
          value={String(itemDetail.contractTime)}
          onChange={handleInputChange}
        />
        <TextInput
          placeholder="대여 가능 시간"
          name="contractTime"
          value={String(itemDetail.time)}
          onChange={handleInputChange}
        />
        <ItemInfoContainer>
          <p>설명</p>
          <textarea placeholder="상품의 상태를 자세히 적어주세요." value={itemDetail?.itemContents} name="itemContents" onChange={handleInputChange}/>
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

const InputContainer = styled.form`
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