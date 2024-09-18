"use client";
import React from "react";
import styled from "styled-components";

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
`;

const Icon = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: var(--gray2);
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

const AlarmTitle = styled.div`
  background-color: var(--gray2);
  height: 1rem;
  width: 50%;
  border-radius: 5px;
`;

const AlarmTime = styled.div`
  background-color: var(--gray2);
  height: 0.75rem;
  width: 30%;
  border-radius: 5px;
`;

const AlarmContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 5px;
`;

const Content = styled.div`
  background-color: var(--gray2);
  height: 0.95rem;
  width: 100%;
  border-radius: 5px;
`;

const AlarmItemImage = styled.div`
  width: 100px;
  height: 100px;
  background-color: var(--gray2);
  border-radius: 5px;
`;

const SkeletonAlarmListItem = (): JSX.Element => {
  return (
    <Container>
      <IconContainer>
        <Icon />
      </IconContainer>
      <AlarmContentContainer>
        <AlarmTitleContainer>
          <AlarmTitle />
          <AlarmTime />
        </AlarmTitleContainer>
        <AlarmContent>
          <Content />
          <Content />
          <Content />
        </AlarmContent>
      </AlarmContentContainer>
      <AlarmItemImage />
    </Container>
  );
};

export default SkeletonAlarmListItem;
