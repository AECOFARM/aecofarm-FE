import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import axios from "axios";
import SkeletonLendItemPost from "./skeleton/SkeletonLendItemPost";
import LikeButton from "./LikeButton";
import Image from "next/image";

const Container = styled.div`
  background-color: white;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray3};
  padding: 10px 10px;
  position: relative;
  display: flex;
  max-width: 480px;
  width: 100%;
  cursor: pointer;
`;

const ItemInfo = styled.div`
  width: 90%;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const Title = styled.div`
  color: black;
  display: block;
  width: 100%;
  text-align: left;
  font-size: 19px;
  margin-bottom: 5px;
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
`;

const Place = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.gray6};
  display: flex;
  align-items: flex-start;
  gap: 8px;
  div {
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  }
  width: 100%;
`;

const TimeAndPrice = styled.p`
  font-size: 13px;
  color: black;
  font-weight: 400;
  margin-bottom: 5px;
`;

const HashTags = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const HashTag = styled.span`
  background-color: white;
  color: ${({ theme }) => theme.colors.orange2};
  padding: 2px;
  margin-right: 5px;
  border-radius: 5px;
  font-size: 13px;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
`;

interface Post {
  contractId: number;
  itemId?: number;
  itemName: string;
  itemPlace: string;
  price: number;
  time: number;
  contractTime: number;
  itemHash: string[];
  likeStatus: boolean;
  donateStatus: boolean;
  distance?: number;
  lowPrice?: number;
  highPrice?: number;
}

interface LendItemPostProps {
  post: Post;
  buttonVisible?: boolean;
  onClick?: () => void;
}

const LendItemPost: React.FC<LendItemPostProps> = ({ post }) => {
  const {
    contractId,
    itemId,
    itemName,
    itemPlace,
    price,
    time,
    contractTime,
    itemHash,
    likeStatus,
  } = post;

  const router = useRouter();
  const moveDetail = () => {
    router.push(`/lend-detail/${contractId}`);
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <SkeletonLendItemPost />;
  }

  return (
    <Container onClick={moveDetail}>
      <ItemInfo>
        <Title>{itemName}</Title>
        <TimeAndPrice>
          {time}시간 | {price}P
        </TimeAndPrice>
        <Place>
          <div>
            <Image
              src="/img/location-pin.svg"
              alt="location pin"
              width={14}
              height={14}
            />{" "}
            {itemPlace}
          </div>
          <div>
            <Image
              src="/img/clock-icon.svg"
              alt="clock"
              width={14}
              height={14}
            />{" "}
            {contractTime}분 이내 거래 희망
          </div>
        </Place>
        <HashTags>
          {itemHash.map((tag, index) => (
            <HashTag key={index}>#{tag}</HashTag>
          ))}
        </HashTags>
      </ItemInfo>
      <LikeButton
        top={10}
        right={15}
        size={24}
        contractId={contractId}
        itemId={itemId}
        type="lend"
      />
    </Container>
  );
};

export default LendItemPost;
