'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import AppLayout from '@/components/layout/MobileLayout';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import MainLayout from '@/components/layout/MainLayout';
import NoFixedTopBar from '@/components/NoFixedTopBar';
import Popup from '@/components/Popup'; 
import SkeletonLendDetail from '@/components/skeleton/SkeletonLendDetail';

interface ItemDetail {
  contractId: number;
  itemName: string;
  userName: string;
  userImage: string;
  itemContents: string;
  itemId: number;
  kakao: string;
  price: number;
  itemPlace: string;
  time: number;
  contractTime: number;
  itemHash: string[];
  likeStatus: boolean;
  donateStatus: boolean;
  owner: boolean;
}

const Container = styled.div`
  background-color: white;
  border: 1px solid var(--gray3);
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
  flex-direction: row;
  align-items: center;
  gap: 5px;
  width: 85%;
`;

const Title = styled.h2`
  color: black;
  font-size: 24px;
  font-weight: 600;
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
  color: var(--gray6);
  font-weight: 400;
  margin-top: 15px;
`;

const TimeAndPrice = styled.p`
  font-size: 17px;
  color: black;
  font-weight: 400;
`;

const HashTags = styled.div`
  padding: 10px 0;
`;

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
  top: 30px;
  right: 45px;
  width: 25px;
  height: 30px;
  cursor: pointer;
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

  img, span {
    vertical-align: middle;
  }
`;

const ProfileImg = styled.img`
  width: 30px;
  border-radius: 30px;
  border: 1px solid var(--gray3);
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

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 380px;
  width: 90%;
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

const LendDetailPage = () => {
  const { contractId } = useParams();
  const router = useRouter();
  const [itemDetail, setItemDetail] = useState<ItemDetail | null>(null);
  const [likeStatus, setLikeStatus] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showRequestPopup, setShowRequestPopup] = useState(false); 
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!contractId) {
      return;
    }

    const fetchItemDetail = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/contract/detail/${contractId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data.code === 200) {
          const item = response.data.data;
          setItemDetail(item);
          setLikeStatus(item.likeStatus);
        }
      } catch (error) {
        console.error('Failed to fetch item detail:', error);
      } finally {
        setLoading(false);  // Set loading to false once the data is fetched
      }
    };

    fetchItemDetail();
  }, [contractId]);

  const toggleLikeStatus = async () => {
    try {
      if (likeStatus) {
        const response = await axios.delete(`/api/likes/delete/${contractId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          data: { 'itemId': `${itemDetail?.itemId}`} 
        });
        console.log(response);
      } else {
        const response = await axios.post(`/api/likes/add/${contractId}`, {}, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log(response);
      } 
      setLikeStatus(prevStatus => !prevStatus);
    } catch (error) {
      console.error("An error occurred while toggling like status:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`/api/contract/delete/${contractId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.code === 200) {
        setShowModal(true);
      } else {
        console.error('삭제에 실패하였습니다:', response.data.message);
        alert('삭제에 실패하였습니다.');
      }
    } catch (error) {
      console.error('Failed to delete item:', error);
      alert('삭제에 실패하였습니다.');
    }
  };

  const handleUpdate = () => {
    router.push(`/post/edit/${contractId}?category=LEND`);
  };

  const closeModalAndRedirect = () => {
    setShowModal(false);
    router.push('/lend');
  };

  const handleLendRequest = () => {
    setShowRequestPopup(true);
  };

  const closeRequestPopup = () => {
    setShowRequestPopup(false);
  };

  const confirmLendRequest = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(`/api/lend/request/${contractId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.code === 200) {
        alert('빌려주기 요청에 성공하였습니다.');
        closeRequestPopup();
        router.push('/lend');
      } else {
        alert('빌려주기 요청에 실패하였습니다.');
        console.error('빌려주기 요청에 실패하였습니다:', response.data.message);
      }
    } catch (error) {
      alert('빌려주기 요청에 실패하였습니다.');
      console.error('Failed to send lend request:', error);
    }
  };

  if (loading) {  
    return (
      <AppLayout>
        <Header />
        <MainLayout>
          <DetailContainer>
            <SkeletonLendDetail />
          </DetailContainer>
        </MainLayout>
        <Navigation />
      </AppLayout>
    );
  }


  if (!itemDetail) {
    return (
      <AppLayout>
        <Header />
        <MainLayout>
          <DetailContainer>
            <SkeletonLendDetail />
          </DetailContainer>
        </MainLayout>
        <Navigation />
      </AppLayout>
    );
  }

  const {
    itemName,
    userName,
    userImage,
    itemContents,
    kakao,
    itemPlace,
    price,
    time,
    contractTime,
    itemHash,
    donateStatus,
    owner
  } = itemDetail;

  const likeIconSrc = likeStatus ? '/img/red-heart.svg' : '/img/empty-heart.svg';

  return (
    <AppLayout>
      <Header />
      <MainLayout>
        <NoFixedTopBar text='' />
        <Container>
          <ItemInfo>
            <TitleContainer>
              <Title>{itemName}</Title>
            </TitleContainer>
            <UserContainer>
              <User>
                <ProfileImg src={userImage}/><span>{userName}</span>
              </User>
              {owner && (
                <EditDeleteContainer>
                  <EditButton onClick={handleUpdate}>수정</EditButton>
                  <DeleteButton onClick={handleDelete}>삭제</DeleteButton>
                </EditDeleteContainer>
              )}
            </UserContainer>
            <Content>{itemContents}</Content>
            <HashTags>
              {itemHash.map((tag, index) => (
                <HashTag key={index}>#{tag}</HashTag>
              ))}
            </HashTags>
            <TimeAndPrice>{time}시간 대여 희망 | {price}P</TimeAndPrice>
            <Place>
              <img src='/img/location-pin.svg' alt='location pin' /> {itemPlace}
              <div>
                <img src='/img/clock-icon.svg' alt='clock' /> {contractTime}분 이내 거래 희망
              </div>
            </Place>
          </ItemInfo>
          <LikeIcon src={likeIconSrc} alt='like icon' onClick={toggleLikeStatus} />
          {!owner && (
          <ButtonContainer>
            <LendButton href={kakao} target="_blank">
              오픈채팅 바로가기
            </LendButton>
            <LendButton onClick={handleLendRequest}>
              빌려주기
            </LendButton>
          </ButtonContainer>
          )}
        </Container>
      </MainLayout>
      <Navigation />
      {showModal && (
        <ModalBackground>
          <ModalContainer>
            <p>게시글이 삭제되었습니다.</p>
            <ModalButton onClick={closeModalAndRedirect}>확인</ModalButton>
          </ModalContainer>
        </ModalBackground>
      )}
      {showRequestPopup && (
        <Popup
          isOpen={showRequestPopup}
          onClose={closeRequestPopup}
          title="빌려주시겠습니까?"
          button1={{
            text: '예',
            onClick: confirmLendRequest
          }}
          button2={{
            text: '아니오',
            onClick: closeRequestPopup
          }}
        >
          *요청 시 상대방에게 알림이 전송됩니다.
        </Popup>
      )}
    </AppLayout>
  );
};

export default LendDetailPage;
