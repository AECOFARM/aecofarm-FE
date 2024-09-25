"use client";
import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import styled from "styled-components";
import TagInput from "./components/TagInput";
import TextInput from "./components/TextInput";
import { useRouter } from "next/navigation";
import TopBar from "@/components/TopBar";
import MainLayout from "@/components/layout/MainLayout";
import { Wrapper } from "@/components/CommonStyles";
import PostButton from "./components/PostButton";
import PostLoading from "@/components/loading/PostLoading";
import AlertPopup from "@/components/AlertPopup";
import axios from "axios";

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
  border-bottom: 0.5px solid ${({ theme }) => theme.colors.gray6};
  select,
  option {
    font-size: 0.8rem;
    text-align: center;
    color: ${({ theme }) => theme.colors.gray6};
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
  background-color: ${({ theme }) => theme.colors.gray5};
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
    color: ${({ theme }) => theme.colors.gray6};
  }
  textarea {
    height: 100%;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.while};
    border: none;
    color: ${({ theme }) => theme.colors.gray6};
    font-size: 1rem;
    &::placeholder {
      color: ${({ theme }) => theme.colors.gray4};
    }
    outline: 0;
  }
`;

interface ItemDetail {
  category: string;
  itemName: string;
  kakao: string;
  itemHash: string[];
  time: string;
  contractTime: string;
  price: string;
  itemPlace: string;
  itemContents: string;
  file?: File | null;
  imagePreviewUrl?: string;
}

const Post = () => {
  const router = useRouter();
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [tags, setTags] = useState<string[]>([]);

  const [category, setCategory] = useState("BORROW");
  const [itemDetail, setItemDetail] = useState<ItemDetail>({
    category: "BORROW",
    itemName: "",
    kakao: "",
    itemHash: [],
    time: "",
    contractTime: "",
    price: "",
    itemPlace: "",
    itemContents: "",
    file: null,
    imagePreviewUrl: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [numberValue, setNumberValue] = useState<string>("");

  const fetchPost = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");
    const formData = new FormData();
    const json = JSON.stringify({
      category: itemDetail.category,
      itemName: itemDetail.itemName,
      kakao: itemDetail.kakao,
      itemHash: tags,
      time: itemDetail.time ? parseInt(itemDetail.time) : 0,
      contractTime: itemDetail.contractTime
        ? parseInt(itemDetail.contractTime)
        : 0,
      price: itemDetail.price ? parseInt(itemDetail.price) : 0,
      itemPlace: itemDetail.itemPlace,
      itemContents: itemDetail.itemContents,
    });
    const blob = new Blob([json], {
      type: "application/json",
    });

    formData.append("createContract", blob);

    if (itemDetail.file) {
      formData.append("file", itemDetail.file);
    } else {
      const emptyFile = new File([""], "empty.txt", { type: "text/plain" });
      formData.append("file", emptyFile);
    }

    try {
      setError(null);

      const response = await axios.post(`/api/contract/post`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      setTimeout(() => {
        setLoading(false);
      }, 2000); // 로딩 상태를 2초간 유지
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      router.push("/post/complete");
    }
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setCategory(value);
    setItemDetail((prevState) => ({
      ...prevState,
      category: value,
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (e.target.type === "number") {
      if (/^\d*$/.test(value)) {
        // 숫자만 포함된 경우
        setItemDetail((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
    } else {
      setItemDetail((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    var limit_size = 1024 * 1024;
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      var upload_size = file.size;
      if (limit_size < upload_size) {
        setIsAlertOpen(true);
        return false;
      } else {
        const reader = new FileReader();
        reader.onloadend = () => {
          setItemDetail((prevState) => ({
            ...prevState,
            file: file,
            imagePreviewUrl: reader.result as string,
          }));
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleImageInput = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  const handleTagsChange = (newTags: string[]) => {
    setTags(newTags);
  };

  const removeImage = () => {
    setItemDetail((prevState) => ({
      ...prevState,
      file: null,
      imagePreviewUrl: "",
    }));
  };

  return (
    <MainLayout>
      <TopBar text="글쓰기" />
      <Wrapper>
        {loading && <PostLoading />}
        <Form onSubmit={fetchPost} method="post">
          <SelectContainer>
            <select value={category} onChange={handleCategoryChange}>
              <option key="빌려주고 싶어요" value="BORROW">
                빌려주고 싶어요
              </option>
              <option key="대여하고 싶어요" value="LEND">
                대여하고 싶어요
              </option>
            </select>
          </SelectContainer>
          <InputContainer>
            {category === "BORROW" && (
              <ImageInputContainer>
                <input
                  type="file"
                  ref={imageInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  style={{ display: "none" }}
                />
                <label htmlFor="file" onClick={handleImageInput}>
                  <ImagePreview>
                    {itemDetail.imagePreviewUrl ? (
                      <img
                        src={itemDetail.imagePreviewUrl}
                        alt="Image Preview"
                      />
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
            <TagInput
              placeholder="해시태그 입력"
              onChange={handleTagsChange}
              value={itemDetail.itemHash}
            />
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
              label="분 이내"
            />
            <TextInput
              placeholder="대여 가능 시간"
              name="time"
              value={String(itemDetail.time)}
              onChange={handleInputChange}
              type="number"
              required
              label="시간"
            />
            <ItemInfoContainer>
              <p>설명</p>
              <textarea
                placeholder="상품의 상태를 자세히 적어주세요."
                name="itemContents"
                value={itemDetail?.itemContents}
                onChange={handleInputChange}
                required
              />
            </ItemInfoContainer>
          </InputContainer>
          <PostButton text="등록하기" />
        </Form>
        <AlertPopup
          title="이미지 사이즈 초과"
          content="1mb 사이즈 미만의 이미지만 업로드가 가능합니다."
          button="확인"
          isOpen={isAlertOpen}
          onClose={() => setIsAlertOpen(false)}
        />
      </Wrapper>
    </MainLayout>
  );
};

export default Post;
