"use client";

import styled from "styled-components";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import SelectBox from "./components/SelectBox";
import AppLayout from "@/components/layout/MobileLayout";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import MainLayout from "@/components/layout/MainLayout";
import BorrowItemPost from "../../components/BorrowItemPost";
import SeeDonate from "./components/SeeDonate";
import borrowMockPosts from "@/data/borrowMockPosts";

interface Post {
  contractId: number;
  itemId: number;
  itemName: string;
  itemImage: string;
  itemPlace: string;
  price: number;
  time: number;
  contractTime: number;
  itemHash: string[];
  likeStatus: boolean;
  donateStatus: boolean;
  distance: number;
  lowPrice: number;
  highPrice: number;
}

interface FetchResponse {
  code: number;
  data: Post[];
  message?: string;
}

const ButtonContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 500px;
  font-size: 18px;
  padding-top: 20px;
  z-index: 10000;
`;

const PostContainer = styled.div`
  position: fixed;
  top: 130px;
  height: 75%;
  max-height: 635px;
  overflow-y: auto;
  width: 100%;
`;

const BorrowPage: React.FC = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [sortType, setSortType] = useState<string>("NEWEST");
  const [seeDonateStatus, setSeeDonateStatus] = useState<boolean>(false);

  const moveDetail = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    const contractId = Number(
      (e.currentTarget as HTMLDivElement).dataset.contractId
    );
    if (contractId) {
      router.push(`/borrow-detail/${contractId}`);
    }
  };

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      try {
        const response = await axios.get<FetchResponse>("/api/borrow/list", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            sortType: sortType,
          },
        });

        if (response.data.code === 200) {
          let fetchedPosts = response.data.data;

          // 만약 API에서 데이터를 가져오지 못했을 경우 MockData 사용
          if (fetchedPosts.length === 0) {
            fetchedPosts = seeDonateStatus
              ? borrowMockPosts.filter((post: Post) => post.price === 0)
              : borrowMockPosts;
          } else if (seeDonateStatus) {
            fetchedPosts = fetchedPosts.filter(
              (post: Post) => post.price === 0
            );
          }

          setPosts(fetchedPosts);
        } else {
          console.error("Failed to fetch data:", response.data.message);
        }
      } catch (error) {
        // 서버 오류 발생 시 임시 데이터 사용
        console.error("Error fetching data:", error);
        const fetchedPosts = seeDonateStatus
          ? borrowMockPosts.filter((post: Post) => post.price === 0)
          : borrowMockPosts;

        setPosts(fetchedPosts);
      }
    };

    fetchData();
  }, [sortType, seeDonateStatus]);

  return (
    <AppLayout>
      <Header />
      <MainLayout>
        <ButtonContainer>
          <SelectBox setSortType={setSortType} />
          <SeeDonate setSeeDonateStatus={setSeeDonateStatus} />
        </ButtonContainer>
        <PostContainer>
          {posts.map((post) => (
            <BorrowItemPost
              key={post.contractId}
              post={post}
              onClick={moveDetail}
            />
          ))}
        </PostContainer>
      </MainLayout>
      <Navigation />
    </AppLayout>
  );
};

export default BorrowPage;
