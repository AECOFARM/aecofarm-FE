'use client'
import React, {useState, useRef, useCallback} from "react";
import styled from 'styled-components';
import TagInput from "./components/TagInput";
import TextInput from "./components/TextInput";
import { useRouter } from "next/navigation";
import TopBar from "@/components/TopBar";
import MainLayout from "@/components/layout/MainLayout";
import { Wrapper } from "@/components/CommonStyles";
import PostButton from "./components/PostButton";
import axios from "axios";
import { tagsState } from "@/state/atoms";

const Form = styled.form`
  width: 100%;
`;

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
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 200px;
`;

const ImagePreview = styled.div`
  display: flex;
  width: 200px;
  height: 200px;
  align-items: center;
  background-color: var(--gray5);
  overflow: hidden;
  border-radius: 10px;
  p {
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0 auto;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const RemoveButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  img { 
    width: 30px;
    height: 30px;
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

interface ItemDetail {
  category: string;
  itemName: string;
  kakao: string;
  itemHash: string[];
  time: number;
  contractTime: number;
  price: number;
  itemPlace: string;
  itemContents: string;
  file?: File | null;
  imagePreviewUrl?: string;
}

const Post = () => {
  const router = useRouter();
  const imageInputRef = useRef<HTMLInputElement>(null);
  const tags = useRecoilValue(tagsState);

  const [category, setCategory] = useState("BORROW");
  const [itemDetail, setItemDetail] = useState<ItemDetail>({
    category: "BORROW",
    itemName: "",
    kakao: "",
    itemHash: [],
    time: 0,
    contractTime: 0,
    price: 0,
    itemPlace: "",
    itemContents: "",
    file: null,
    imagePreviewUrl: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !itemDetail.itemName ||
      !tags.length ||
      !itemDetail.contractTime ||
      !itemDetail.time ||
      !itemDetail.price ||
      !itemDetail.itemPlace ||
      !itemDetail.itemContents
    ) {
      alert("모든 항목을 입력해주세요!");
      return;
    }

    const token = localStorage.getItem('token');
    const formData = new FormData();
    const json = JSON.stringify({
      category: itemDetail.category,
      itemName: itemDetail.itemName,
      kakao: itemDetail.kakao,
      itemHash: tags.map(tag => tag.value),
      time: itemDetail.time,
      contractTime: itemDetail.contractTime,
      price: itemDetail.price,
      itemPlace: itemDetail.itemPlace,
      itemContents: itemDetail.itemContents
    });
    const blob = new Blob([json], {
      type: 'application/json'
    });

    formData.append('createContract', blob);

    if (itemDetail.file) {
      formData.append('file', itemDetail.file);
    } else {
      const emptyFile = new File([""], "empty.txt", {type: "text/plain"});
      formData.append('file', emptyFile);
    }
      
    try {
      setError(null);
      setLoading(true);

      const response = await axios.post(`/api/contract/post`,
        formData,{
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response);
      router.push("/post/complete");
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setCategory(event.target.value);
    setItemDetail(prevState => ({
      ...prevState,
      category: value
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setItemDetail(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : undefined;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setItemDetail(prevState => ({
          ...prevState,
          file: file,
          imagePreviewUrl: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageInput = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  const removeImage = () => {
    setItemDetail(prevState => ({
      ...prevState,
      file: null,
      imagePreviewUrl: ""
    }));
  };

  return(
    <MainLayout>
      <TopBar text="글쓰기" />
      <Wrapper>
      <Form onSubmit={fetchPost} method="post">
      <SelectContainer>
        <select value={category} onChange={handleCategoryChange}>
          <option key="빌려주고 싶어요" value="BORROW">빌려주고 싶어요</option>
          <option key="대여하고 싶어요" value="LEND">대여하고 싶어요</option>
        </select>
      </SelectContainer>
      <InputContainer>
        {category === "BORROW" && (
          <ImageInputContainer>
            <input type="file" ref={imageInputRef} onChange={handleFileChange} accept="image/*" style={{ display: 'none' }}/>
            <label htmlFor="file" onClick={handleImageInput}>
              <ImagePreview>
                  {itemDetail.imagePreviewUrl ? (
                    <img src={itemDetail.imagePreviewUrl} alt="Image Preview" />
                  ) : (
                    <p>이미지 선택</p>
                  )}
              </ImagePreview>
              {itemDetail.imagePreviewUrl && (
                <RemoveButton onClick={removeImage}>
                  <img src="/remove-icon.svg" alt="remove" />
                </RemoveButton>
              )}
            </label>
          </ImageInputContainer>
        )}
        <TextInput
          placeholder="상품명"
          name="itemName"
          value={itemDetail?.itemName}
          onChange={handleInputChange}
          type="text"
          required
        />
        <TextInput
          placeholder="오픈채팅방 링크"
          name="kakao"
          value={itemDetail?.kakao}
          onChange={handleInputChange}
          type="text"
          required
        />
        <TagInput placeholder="해시태그 입력"/>
        <TextInput
          placeholder="가격"
          name="price"
          value={String(itemDetail.price)}
          onChange={handleInputChange}
          type="number"
          required
        />
        <TextInput
          placeholder="거래 가능 장소"
          name="itemPlace"
          value={itemDetail?.itemPlace}
          onChange={handleInputChange}
          type="text"
          required
        />
        <TextInput
          placeholder="거래 가능 시간"
          name="contractTime"
          value={String(itemDetail.contractTime)}
          onChange={handleInputChange}
          type="number"
          required
        />
        <TextInput
          placeholder="대여 가능 시간"
          name="time"
          value={String(itemDetail.time)}
          onChange={handleInputChange}
          type="number"
          required
        />
        <ItemInfoContainer>
          <p>설명</p>
          <textarea placeholder="상품의 상태를 자세히 적어주세요." name="itemContents" value={itemDetail?.itemContents} onChange={handleInputChange}/>
        </ItemInfoContainer>
      </InputContainer>
      <PostButtonContainer>
        <NoticeButton>상품 등록 시 유의사항을 확인하세요.</NoticeButton>
        <PostButton text="등록하기" />
      </PostButtonContainer>
      </Form>
    </Wrapper>
    </MainLayout>
  );
};

export default Post;