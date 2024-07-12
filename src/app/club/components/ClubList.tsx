import React from "react";
import ClubListItem from "./ClubListItem";
import styled from "styled-components";
import { useRouter } from "next/navigation";

interface ClubInfoData {
  image: string;
  clubName: string;
  move: string;
}

const data: ClubInfoData[] = [
  {
    "image": "/img/club-image1.png",
    "clubName": "AI 융합대학",
    "move": "ai"
  },
  {
    "image": "/img/club-image2.png",
    "clubName": "공과대학",
    "move": "engineering"
  },
  {
    "image": "/img/club-image3.png",
    "clubName": "컴퓨터공학전공",
    "move": "computer"
  },
  {
    "image": "/img/club-image4.png",
    "clubName": "동불",
    "move": "dongbul"
  },
]

const ClubList: React.FC = () => {

  return (
    <Container>
      {data.map((club, index) => (
                    <ClubListItem key={index} club={club}/>
                  ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  width: 80%;
`;

export default ClubList;