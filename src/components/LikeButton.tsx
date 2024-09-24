"use client";
import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { borrowPostDetailState } from "@/recoil/borrow/borrowRecoilState";
import { lendPostDetailState } from "@/recoil/lend/lendRecoilState";
import { useRecoilState } from "recoil";
import axios from "axios";

interface ButtonProps {
  top: number;
  right: number;
  size: number;
  contractId: number;
  itemId?: number;
  type: "borrow" | "lend";
}

const LikeIcon = styled(Image)<{ top: number; right: number; size: number }>`
  cursor: pointer;
  position: absolute;
  top: ${(props) => props.top + "px"};
  right: ${(props) => props.right + "px"};
  width: ${(props) => props.size + "px"};
  height: ${(props) => props.size + "px"};
`;

const LikeButton: React.FC<ButtonProps> = ({
  top,
  right,
  size,
  contractId,
  itemId,
  type,
}) => {
  const [borrowPostDetail, setBorrowPostDetail] = useRecoilState(
    borrowPostDetailState
  );
  const [lendPostDetail, setLendPostDetail] =
    useRecoilState(lendPostDetailState);
  const isBorrowType = type === "borrow";
  const currentDetail = isBorrowType ? borrowPostDetail : lendPostDetail;
  const setDetail = isBorrowType ? setBorrowPostDetail : setLendPostDetail;

  const token = localStorage.getItem("token");

  const toggleLikeStatus = async (): Promise<void> => {
    try {
      if (currentDetail.likeStatus) {
        await axios.delete(`/api/likes/delete/${currentDetail.contractId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: { itemId: itemId },
        });
      } else {
        await axios.post(
          `/api/likes/add/${contractId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      setDetail((prevState: any) => ({
        ...prevState,
        likeStatus: !prevState.likeStatus,
      }));
    } catch (error) {
      console.error("An error occurred while toggling like status:", error);
    }
  };
  const likeStatusSrc = currentDetail.likeStatus
    ? "/img/red-heart.svg"
    : "/img/empty-heart.svg";
  return (
    <div>
      <LikeIcon
        top={top}
        right={right}
        size={size}
        src={likeStatusSrc}
        alt="like status"
        onClick={toggleLikeStatus}
      />
    </div>
  );
};
export default LikeButton;
