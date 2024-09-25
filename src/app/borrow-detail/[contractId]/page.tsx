"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";
import AppLayout from "@/components/layout/MobileLayout";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import MainLayout from "@/components/layout/MainLayout";
import NoFixedTopBar from "@/components/NoFixedTopBar";
import DonateLabel from "@/components/DonateLabel";
import Popup from "@/components/Popup";
import AlertPopup from "@/components/AlertPopup";
import api from "@/utils/api";
import LikeButton from "@/components/LikeButton";
import SkeletonBorrowDetail from "@/components/skeleton/SkeletonBorrowDetail";

interface ItemDetail {
  owner: boolean;
  contractId: number;
  itemId: number;
  userName: string;
  userImage: string;
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

const Container = styled.div`
  background-color: white;
  border: 1px solid ${({ theme }) => theme.colors.gray3};
  padding: 20px;
  position: relative;
  max-width: 440px;
  width: 90%;
  border-radius: 10px;
  margin: 20px auto;
  max-height: 700px;
`;

const ItemInfo = styled.div`
  width: 100%;
  padding: 15px 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Title = styled.h2`
  color: black;
  font-size: 22px;
  font-weight: 600;
`;

const UserContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const User = styled.div`
  font-size: 17px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.colors.gray6};

  span {
    padding-right: 30px;
  }

  img,
  span {
    vertical-align: middle;
  }
`;

const ProfileImg = styled.img`
  height: 30px;
  width: 30px;
  margin-left: 7px;
  border-radius: 30px;
  border: 1px solid ${({ theme }) => theme.colors.gray3};
`;

const Place = styled.div`
  font-size: 17px;
  color: ${({ theme }) => theme.colors.gray6};
  display: flex;
  align-items: center;

  img {
    margin-right: 2px;
  }

  div {
    margin-left: 7px;
  }
`;

const Content = styled.div`
  font-size: 17px;
  color: ${({ theme }) => theme.colors.gray5};
  font-weight: 400;
  margin-bottom: 5px;
`;

const TimeAndPrice = styled.p`
  font-size: 17px;
  color: black;
  font-weight: 400;
`;

const HashTags = styled.div``;

const HashTag = styled.span`
  background-color: white;
  color: ${({ theme }) => theme.colors.orange2};
  padding: 2px;
  margin-right: 5px;
  border-radius: 5px;
  font-size: 15px;
`;

const LendButton = styled.a`
  background-color: white;
  color: ${({ theme }) => theme.colors.orange2};
  padding: 12px 15px;
  margin: 10px 5px;
  border: 1px solid ${({ theme }) => theme.colors.gray3};
  border-radius: 24px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.orange2};
    color: ${({ theme }) => theme.colors.white};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

const DetailContainer = styled.div`
  padding: 20px;
`;

const ItemImage = styled.img`
  width: 100%;
  max-width: 400px;
  max-height: 375px;
  margin-bottom: 20px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.gray3};
  display: block;
  margin: auto;
`;

const EditDeleteContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const EditButton = styled.button`
  background-color: ${({ theme }) => theme.colors.orange2};
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background-color: ${({ theme }) => theme.colors.orange3};
  }
`;

const DeleteButton = styled.button`
  background-color: ${({ theme }) => theme.colors.red};
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background-color: darkred;
  }
`;

const BorrowDetailPage: React.FC = () => {
  const { contractId } = useParams();
  const [itemDetail, setItemDetail] = useState<ItemDetail | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showRequestPopup, setShowRequestPopup] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!contractId) {
      return;
    }

    const fetchItemDetail = async (): Promise<void> => {
      try {
        const response = await api.get(`/contract/detail/${contractId}`);
        if (response.data.code === 200) {
          const item: ItemDetail = response.data.data;
          setItemDetail(item);
        } else {
          console.error("Error fetching item details:", response.data.message);
        }
      } catch (error) {
        console.error("Failed to fetch item detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItemDetail();
  }, [contractId]);

  const handleDelete = async (): Promise<void> => {
    try {
      const response = await api.delete(`/contract/delete/${contractId}`);
      if (response.data.code === 200) {
        setShowModal(true);
      } else {
        alert("삭제에 실패하였습니다.");
      }
    } catch (error) {
      console.error("Failed to delete item:", error);
      setErrorMessage("삭제에 실패하였습니다.");
    }
  };

  const handleUpdate = (): void => {
    router.push(`/post/edit/${contractId}?category=BORROW`);
  };

  const handleRequestClick = (): void => {
    setShowRequestPopup(true);
  };

  const closeRequestPopup = (): void => {
    setShowRequestPopup(false);
  };

  const closeModalAndRedirect = (): void => {
    setShowModal(false);
    router.push("/borrow");
  };

  const handleRequest = (): void => {
    router.push(`/reserve/${contractId}`);
  };

  if (loading || !itemDetail) {
    return (
      <AppLayout>
        <Header />
        <MainLayout>
          <DetailContainer>
            <SkeletonBorrowDetail />
          </DetailContainer>
        </MainLayout>
        <Navigation />
      </AppLayout>
    );
  }

  const {
    owner,
    itemName,
    userName,
    userImage,
    itemContents,
    kakao,
    itemImage,
    itemPlace,
    price,
    time,
    contractTime,
    itemHash,
    donateStatus,
  } = itemDetail;

  return (
    <AppLayout>
      <Header />
      <MainLayout>
        <NoFixedTopBar text="" />
        <Container>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <ItemImage
            src={itemImage || "/img/default-image.png"}
            alt={itemName}
          />
          <ItemInfo>
            <TitleContainer>
              <Title>{itemName}</Title>
              {donateStatus && <DonateLabel />}
            </TitleContainer>
            <Content>{itemContents}</Content>
            <TimeAndPrice>
              {time}시간 | {price}P
            </TimeAndPrice>
            <Place>
              <img src="/img/location-pin.svg" alt="location pin" /> {itemPlace}
              <div>
                <img src="/img/clock-icon.svg" alt="clock" /> {contractTime}분
                이내 거래 가능
              </div>
            </Place>
            <HashTags>
              {itemHash.map((tag, index) => (
                <HashTag key={index}>#{tag}</HashTag>
              ))}
            </HashTags>
          </ItemInfo>
          <LikeButton
            top={40}
            right={45}
            size={30}
            type="borrow"
            contractId={itemDetail.contractId}
            itemId={itemDetail.itemId}
            likeStatus={itemDetail.likeStatus}
          />
          <UserContainer>
            <User>
              <ProfileImg src={userImage} />
              <span>{userName}</span>
            </User>
            {owner && (
              <EditDeleteContainer>
                <EditButton onClick={handleUpdate}>수정</EditButton>
                <DeleteButton onClick={handleDelete}>삭제</DeleteButton>
              </EditDeleteContainer>
            )}
          </UserContainer>
          {!owner && (
            <ButtonContainer>
              <LendButton href={kakao} target="_blank">
                오픈채팅 바로가기
              </LendButton>
              <LendButton onClick={handleRequestClick}>
                대여 요청하기
              </LendButton>
            </ButtonContainer>
          )}
        </Container>
      </MainLayout>
      <Navigation />
      <AlertPopup
        title="게시글 삭제 완료"
        content="메인 페이지로 이동합니다."
        isOpen={showModal}
        onClose={closeModalAndRedirect}
        button="확인"
      />
      {showRequestPopup && (
        <Popup
          isOpen={showRequestPopup}
          onClose={closeRequestPopup}
          title="대여 요청을 하시겠습니까?"
          button1={{
            text: "요청하기",
            onClick: handleRequest,
          }}
          button2={{
            text: "취소",
            onClick: closeRequestPopup,
          }}
        >
          *요청 시 상대방에게 알림이 전송됩니다.
        </Popup>
      )}
    </AppLayout>
  );
};

export default BorrowDetailPage;
