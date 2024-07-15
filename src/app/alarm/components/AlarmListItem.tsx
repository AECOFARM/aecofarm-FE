'use client'
import React from "react"
import styled from "styled-components"

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
`;

const AlarmTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const AlarmTitle = styled.p`
  color: var(--black);
  font-size: 1rem;
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
  const formattedTime = alarm.time.toLocaleDateString();  // Date 객체를 문자열로 변환

  let icon = "";
  let content = ""
  if(alarm.status === "REQUEST") {
    icon = "/request-icon.svg";
    content = " 요청";
  } else if (alarm.status === "COMPLETE") {
    icon = "/complete-icon.svg";
    content = " 승인";
  } else if (alarm.status === "ACCEPT") {
    icon = "/complete-icon.svg";
    content = " 결제";
  } else if (alarm.status === "REJECT") {
    icon = "/reject-icon.svg";
    content = " 거절";
  }

  let alarmCategary = "";
  if(category === "lending") {
    alarmCategary = "빌려주기";
  } else if(category === "borrowing") {
    alarmCategary = "대여하기";
  }

    return (
      <Container>
        <IconContainer>
          <img src={icon} />
        </IconContainer>
        <AlarmContentContainer>
          <AlarmTitleContainer>
            <AlarmTitle>
              {alarmCategary}  {content}
            </AlarmTitle>
            <AlarmTime>
              {formattedTime}
            </AlarmTime>
          </AlarmTitleContainer>
          <AlarmContent>
              {alarm.userName}님의 {alarm.itemName} 어쩌구저쩌구 샬라 샬라
            </AlarmContent>
        </AlarmContentContainer>
        <AlarmItemImage src={alarm.image}/>
      </Container>
    );
}

export default AlarmListItem;