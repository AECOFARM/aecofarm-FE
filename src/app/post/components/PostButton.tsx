import styled from "styled-components";
import React from "react";
import OrangeButton from "@/components/OrangeButton";

interface PostButtonProps {
  text: string;
  onClick?: () => void;
}

const PostButton: React.FC<PostButtonProps> = ({ text, onClick }) => {
  return (
    <PostButtonContainer>
      <NoticeButton>상품 등록 시 유의사항을 확인하세요.</NoticeButton>
      <OrangeButton text={text} onClick={onClick} width={150} padding={10} />
    </PostButtonContainer>
  );
};

const PostButtonContainer = styled.div`
  max-width: 500px;
  width: 100%;
  box-shadow: 0 -2px 2px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0px;
  gap: 10px;
  position: fixed;
  bottom: 0px;
  background-color: ${({ theme }) => theme.colors.white};
  left: 50%;
  transform: translateX(-50%);
`;

const NoticeButton = styled.p`
  font-size: 0.9rem;
  text-decoration: underline;
  color: ${({ theme }) => theme.colors.black};
  cursor: pointer;
`;

export default PostButton;
