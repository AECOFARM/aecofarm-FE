'use client'
import React, { useState } from "react";
import styled from "styled-components";
import Popup from "@/components/Popup";
import { useRouter } from "next/navigation";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  max-width: 480px;
  gap: 10px;
  cursor: pointer;
  justify-content: center;
  padding: 10px;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 20px;
  }
`;

const AlarmContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-grow: 1;
`;

const AlarmTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const AlarmTitle = styled.p`
  color: var(--black);
  font-size: 1.1rem;
  font-weight: 600;
`;

const AlarmTime = styled.p`
  color: var(--black);
  font-size: 0.8rem;
`;

const AlarmContent = styled.div`
  color: var(--black);
`;

const AlarmItemImage = styled.img`
  width: 100px;
  height: 100px;
`;

interface Alarm {
  status: string;
  userName: string;
  memberStatus: string;
  contractId: number;
  itemName: string;
  image: string;
  time: Date;
  category?: string;
}

interface AlarmProps {
  alarm: Alarm;
  category?: string;
}

const AlarmListItem: React.FC<AlarmProps> = ({ alarm, category }) => {
  const time = new Date(alarm.time);
  const formattedTime = time.toLocaleDateString();  // Date 객체를 문자열로 변환
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const token = localStorage.getItem('token');

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleRequest = async(bool) => {
    try {
      const response = await axios.patch(`/api/borrow/success`, 
      {success: bool, contractId: alarm.contractId}, {
        headers: {
          'Authorization' : `Bearer ${token}`
        }});
    } catch (err: any) {
      console.log(err.message);
    } finally {
      let message = "";
      if (bool === true) {
        message = "승인 완료!";
      } else {
        message = "거절 완료!";
      }
      alert(message);
      closeModal();
    }
  };

  let icon: string = "";
  let title: string = "";
  let content: string = "";
  let onClick: (() => void) | undefined = () => {};

  if (category === "lending") {
    if (alarm.status === "REQUEST") {
      icon = "/request-icon.svg";
      title = "빌려주기 요청";
      if(alarm.memberStatus === "LEND") {
        content = `${alarm.userName}님에게 ${alarm.itemName} 상품 빌려주기 요청을 보냈습니다.`;
        onClick = () => {
          router.push(`/lend-detail/${alarm.contractId}`);
        }
      } else if(alarm.memberStatus === "BORROW") {
        content = `${alarm.userName}님에게서 ${alarm.itemName} 상품의 빌려주기 요청이 왔습니다. 결제를 진행하세요!`;
        onClick = () => {
          router.push(`/pay/${alarm.contractId}`);
        };
      }
    } else if (alarm.status === "COMPLETE") {
      icon = "/complete-icon.svg";
      title = "거래 완료";
      if (alarm.memberStatus === "LEND") {
        content = `${alarm.userName}님의 ${alarm.itemName} 상품 거래가 완료되었습니다.`;
        onClick = () => {
          router.push(`/lend-detail/${alarm.contractId}`);
        };
      } else if (alarm.memberStatus === "BORROW") {
        content = `${alarm.userName}님의 ${alarm.itemName} 상품 결제가 완료되었습니다.`;
        onClick = () => {
          router.push(`/lend-detail/${alarm.contractId}`);
        };
      }
    }
  } else if (category === "borrowing") {
    if (alarm.status === "REQUEST") {
      icon = "/request-icon.svg";
      title = "대여하기 예약 요청";
      if(alarm.memberStatus === "LEND") {
        content = `${alarm.userName}님으로부터 ${alarm.itemName} 상품 예약 요청이 왔습니다. 예약 내역을 확인하세요.`;
        onClick = () => {
          openModal()
        }
      } else if(alarm.memberStatus === "BORROW") {
        content = `${alarm.userName}님에게 ${alarm.itemName} 상품 예약 요청을 완료하였습니다.`;

        onClick = () => {
          router.push(`/borrow-detail/${alarm.contractId}`);
        };
      }
    } else if (alarm.status === "ACCEPT") {
      icon = "/complete-icon.svg";
      title = "대여하기 예약 승인";
      if (alarm.memberStatus === "LEND") {
        content = `${alarm.userName}님의 ${alarm.itemName} 상품 예약을 승인하였습니다.`;
        onClick = () => {
          router.push(`/borrow-detail/${alarm.contractId}`);
        };
      } else if (alarm.memberStatus === "BORROW") {
        content = `${alarm.userName}님의 ${alarm.itemName} 상품 예약이 승인되었습니다. 결제를 진행하세요!`;
        onClick = () => {
          router.push(`/pay/${alarm.contractId}`);
        };
      }
    } else if (alarm.status === "REJECT") {
      icon = "/reject-icon.svg";
      title = "대여하기 예약 거절";
      if (alarm.memberStatus === "LEND") {
        content = `${alarm.userName}님의 ${alarm.itemName} 상품 예약을 거절하였습니다.`;
        onClick = () => {
          router.push(`/borrow-detail/${alarm.contractId}`);
        };
      } else if (alarm.memberStatus === "BORROW") {
        content = `${alarm.userName}님의 ${alarm.itemName} 상품 예약이 거절되었습니다.`;
        onClick = () => {
          router.push(`/borrow-detail/${alarm.contractId}`);
        };
      }
    } else if (alarm.status === "COMPLETE") {
      icon = "/complete-icon.svg";
      title = "거래 완료";
      if (alarm.memberStatus === "LEND") {
        content = `${alarm.userName}님의 ${alarm.itemName} 상품 거래가 완료되었습니다.`;
        onClick = () => {
          router.push(`/borrow-detail/${alarm.contractId}`);
        };
      } else if (alarm.memberStatus === "BORROW") {
        content = `${alarm.userName}님의 ${alarm.itemName} 상품 결제가 완료되었습니다.`;
        onClick = () => {
          router.push(`/borrow-detail/${alarm.contractId}`);
        };
      }
    }
  }

  const approveButton = {
    text: "승인",
    onClick:() => handleRequest(true)
  }
  const rejectButton = {
    text: "거절",
    onClick:() => handleRequest(false)
  }
  const modalContent = (
    <div>
      <AlarmTime>{formattedTime}</AlarmTime>
      <AlarmTitle>{alarm.itemName}</AlarmTitle>
      <AlarmItemImage src={alarm.image} />
    </div>
  );

    return (
      <Container onClick={onClick}>
        <IconContainer>
          <img src={icon} />
        </IconContainer>
        <AlarmContentContainer>
          <AlarmTitleContainer>
            <AlarmTitle>
              {title}
            </AlarmTitle>
            <AlarmTime>
              {formattedTime}
            </AlarmTime>
          </AlarmTitleContainer>
          <AlarmContent>
              {content}
            </AlarmContent>
        </AlarmContentContainer>
        {alarm.image && <AlarmItemImage src={alarm.image} />}
        {category === ""}
        <Popup isOpen={isOpen} onClose={closeModal} title = "예약 내역" children={modalContent} button1={approveButton} button2={rejectButton} />
      </Container>
    );
}

export default AlarmListItem;
