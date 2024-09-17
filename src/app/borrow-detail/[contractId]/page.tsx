"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
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
  border: 1px solid var(--gray3);
  padding: 20px;
  position: relative;
  max-width: 440px;
  width: 90%;
  border-radius: 10px;
  margin: 20px;
  max-height: 700px;
  margin: auto;
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
  flex-direction: row;
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
  color: var(--gray6);

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
  border: 1px solid var(--gray3);
`;

const Place = styled.div`
  font-size: 17px;
  color: var(--gray6);
  display: flex;

  img {
    margin-right: 2px;
  }

  div {
    margin-left: 7px;
  }
`;

const Content = styled.div`
  font-size: 17px;
  color: var(--gray5);
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
  color: var(--orange2);
  padding: 2px;
  margin-right: 5px;
  border-radius: 5px;
  font-size: 15px;
`;

const LikeIcon = styled.img`
  position: absolute;
  top: 40px;
  right: 45px;
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

const LendButton = styled.a`
  background-color: white;
  color: var(--orange2);
  padding: 12px 15px;
  margin: 10px 5px;
  border: 1px solid var(--gray3);
  border-radius: 24px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: var(--orange2);
    color: white;
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
  border: 1px solid var(--gray3);
  margin: auto;
  display: block;
`;

const EditDeleteContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const EditButton = styled.button`
  background-color: var(--orange2);
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background-color: var(--orange3);
  }
`;

const DeleteButton = styled.button`
  background-color: var(--red);
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

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 400px;
  text-align: center;
`;

const ModalButton = styled.button`
  background-color: var(--orange2);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
  margin-top: 10px;

  &:hover {
    background-color: var(--orange3);
  }
`;

const BorrowDetailPage = () => {
  const { contractId } = useParams();
  const [itemDetail, setItemDetail] = useState<ItemDetail | null>(null);
  const [likeStatus, setLikeStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showRequestPopup, setShowRequestPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!contractId) {
      return;
    }

    const fetchItemDetail = async () => {
      try {
        const response = await api.get(`/contract/detail/${contractId}`);
        if (response.data.code === 200) {
          const item = response.data.data;
          setItemDetail(item);
          setLikeStatus(item.likeStatus);
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

  const toggleLikeStatus = async () => {
    try {
      if (likeStatus) {
        const response = await axios.delete(`/api/likes/delete/${contractId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: { itemId: `${itemDetail?.itemId}` },
        });
        console.log(response);
      } else {
        const response = await axios.post(
          `/api/likes/add/${contractId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
      }
      setLikeStatus((prevStatus) => !prevStatus);
    } catch (error) {
      console.error("An error occurred while toggling like status:", error);
    }
  };

  const handleDelete = async () => {
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

  const handleUpdate = () => {
    router.push(`/post/edit/${contractId}?category=BORROW`);
  };

  const handleRequestClick = () => {
    setShowRequestPopup(true);
  };

  const closeRequestPopup = () => {
    setShowRequestPopup(false);
  };

  const closeModalAndRedirect = () => {
    setShowModal(false);
    router.push("/borrow");
  };

  const handleRequest = async () => {
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

  const likeIconSrc = likeStatus
    ? "/img/red-heart.svg"
    : "/img/empty-heart.svg";

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
              {donateStatus === true && <DonateLabel />}
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
          <LikeIcon
            src={likeIconSrc}
            alt="like icon"
            onClick={toggleLikeStatus}
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
