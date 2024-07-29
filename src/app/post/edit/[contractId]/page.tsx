"use client"
import styled from "styled-components";
import React, {useState, useEffect, useRef} from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import TextInput from "../../components/TextInput";
import TagInput from "../../components/TagInput";
import MainLayout from "@/components/layout/MainLayout";
import { Wrapper } from "@/components/CommonStyles";
import TopBar from "@/components/TopBar";
import PostButton from "../../components/PostButton";
import PostLoading from "@/components/loading/PostLoading";
import AlertPopup from "@/components/AlertPopup";
import axios from "axios";

interface ItemDetail {
    owner: boolean;
    userName: string;
    itemName: string;
    price: string;
    itemImage?: string;
    itemContents: string;
    itemPlace: string;
    itemHash: string[];
    time: string;
    contractTime: string;
    kakao: string;
    category?: string;
  }


const UpdatePost = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("category"); // 쿼리 파라미터로 받은 category
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const { contractId } = useParams() as { contractId: string };
  const [isCompleteOpen, setIsCompleteOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [itemDetail, setItemDetail] = useState<ItemDetail>({
    owner: false,
    userName: "",
    itemName: "",
    price: "",
    itemContents: "",
    itemPlace: "",
    itemHash: [],
    time: "",
    contractTime: "",
    kakao: "",
    itemImage: "",
  });
  const [hasHashWrapInner, setHasHashWrapInner] = useState<boolean>(false);
  const token = localStorage.getItem('token');

  const updatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const updateContract = JSON.stringify({
      category: category,
      itemName: itemDetail.itemName,
      kakao: itemDetail.kakao,
      itemHash: tags,
      time: itemDetail.time ? parseInt(itemDetail.time) : 0,
      contractTime: itemDetail.contractTime ? parseInt(itemDetail.contractTime) : 0,
      price: itemDetail.price ? parseInt(itemDetail.price) : 0,
      itemPlace: itemDetail.itemPlace,
      itemContents: itemDetail.itemContents,
      itemImage: itemDetail.itemImage
    });

    const blob = new Blob([updateContract], {
      type: 'application/json'
    });

    const formData = new FormData();
    formData.append('updateContract', blob);

    if (file) {
      formData.append('file', file);
    } else if (itemDetail.itemImage && itemDetail.itemImage !== "") {
      formData.append('file', itemDetail.itemImage);
    } else {
      const emptyFile = new File([""], "empty.txt", {type: "text/plain"});
      formData.append('file', emptyFile);
    }
    setError(null);
    try {
      
      const response = await axios.put(`/api/contract/update/${contractId}`, formData, {
        headers : {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      setLoading(false);
      if (response.data.code === 200) {
        setIsCompleteOpen(true);
      } else {
        alert('글 수정에 실패하였습니다.');
      }
      
    } catch(err) {
      const errorMessage = (err as Error).message || 'Something went wrong';
      setError(errorMessage);
    } 
  };

  const handleClick = () => {
    setIsCompleteOpen(false);
    if (category === "BORROW") {
      router.push(`/borrow-detail/${contractId}`);
    } else {
      router.push(`/lend-detail/${contractId}`);
    }
  };

  useEffect(() => {
    const hashWrapInnerElements = document.querySelectorAll(".HashWrapInner");
    setHasHashWrapInner(hashWrapInnerElements.length > 0);
  }, [token]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    if (e.target.type === 'number') {
      if (/^\d*$/.test(value)) { // 숫자만 포함된 경우
        setItemDetail(prevState => ({
          ...prevState,
          [name]: value
        }));
      }
    } else {
      setItemDetail(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  useEffect(() => {
    if(!contractId)
      return;
    
    const fetchItemInfo = async () => {
      try {
        const response = await axios.get(`/api/contract/detail/${contractId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const currentItem = response.data.data;
        setItemDetail(currentItem);
        setTags(currentItem.itemHash);

        if (currentItem?.itemImage) {
          try {
            const response = await fetch(currentItem.itemImage, { mode: 'no-cors' });
            const blob = await response.blob();
            const file = new File([blob], "itemImage.jpg", { type: blob.type });
            setFile(file);
          } catch (error) {
            console.error('Error fetching the image:', error);
          }
        }

      } catch (err) {
        const errorMessage = (err as Error).message || 'Something went wrong';
          setError(errorMessage);
      }
    };
    fetchItemInfo();
  }, [contractId]);

  if (!itemDetail) return <div>contractId를 확인하세요</div>;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    var limit_size = 1024 * 1024;
    const selectedFile = e.target.files?.[0] || null;
    if (selectedFile) {
      const upload_size = selectedFile.size;
      if(limit_size < upload_size) {
        setIsAlertOpen(true);
        return false;
      } else {
        const reader = new FileReader();
        reader.onloadend = () => {
        setItemDetail(prevState => ({
          ...prevState,
          itemImage: reader.result as string
        }));
        
      };
      reader.readAsDataURL(selectedFile);
      setFile(selectedFile);
      }
    }
  };

  const handleImageInput = (e: React.MouseEvent) => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  const handleTagsChange = (newTags: string[]) => {
    setTags(newTags);
  };

  const removeImage = () => {
    setItemDetail(prevState => ({
      ...prevState,
      itemImage: ""
    }));
    setFile(null);
    if (imageInputRef.current) {
      imageInputRef.current.value = ''; // 파일 input 값을 초기화
    }
  };

  return(
    <MainLayout>
      <TopBar text="글 수정하기" />
      <Wrapper>
      {loading && <PostLoading />}
        <Form onSubmit={updatePost}>
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
          <input type="file" ref={imageInputRef} onChange={handleFileChange} accept="image/*" style={{ display: 'none' }} />
          <label htmlFor="file" onClick={handleImageInput}>
            <ImagePreview>
                {itemDetail.itemImage ? (
                  <img src={itemDetail.itemImage} alt="Image Preview" />
                ) : (
                  <p>이미지 선택</p>
                )}
            </ImagePreview>
            {itemDetail.itemImage && (
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
          value={itemDetail.itemName}
          onChange={handleInputChange}
          type="text"
          required
        />
        <TextInput
          placeholder="오픈채팅방 링크"
          name="kakao"
          value={itemDetail.kakao}
          onChange={handleInputChange}
          type="text"
          required

        />
        <TagInput placeholder="해시태그 입력" onChange={handleTagsChange} value={itemDetail.itemHash}/>
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
          value={itemDetail.itemPlace}
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
          <textarea placeholder="상품의 상태를 자세히 적어주세요." value={itemDetail?.itemContents} name="itemContents" onChange={handleInputChange}/>
        </ItemInfoContainer>
        </InputContainer>
      <PostButton text="수정하기"/>
      </Form>
      <AlertPopup isOpen={isCompleteOpen} title="게시글 수정 완료!" content="게시글 수정을 완료하였습니다. 확인하세요!" button="확인" onClose={handleClick}/>
      <AlertPopup title="이미지 사이즈 초과" content="1mb 사이즈 미만의 이미지만 업로드가 가능합니다." button="확인" isOpen={isAlertOpen} onClose={() => setIsAlertOpen(false)} />
      </Wrapper>
    </MainLayout>
  );
};

const Category = styled.div`
  font-size: 0.8rem;
  height: 30px;
  color: var(--black);
  border-bottom: 0.5px solid var(--gray6);
  max-width: 500px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  width: 100%;
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


export default UpdatePost;