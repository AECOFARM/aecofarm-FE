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
    image: "/img/club-image1.png",
    clubName: "AI 융합대학",
    move: "ai",
  },
  {
    image: "/img/club-image2.png",
    clubName: "공과대학",
    move: "engineering",
  },
  {
    image: "/img/club-image3.png",
    clubName: "컴퓨터공학전공",
    move: "computer",
  },
  {
    image: "/img/club-image4.png",
    clubName: "동불",
    move: "dongbul",
  },
  {
    image: "/img/club-image5.png",
    clubName: "총학생회",
    move: "student",
  },
  {
    image: "/img/club-image6.png",
    clubName: "교육학과",
    move: "education",
  },
  {
    image: "/img/club-image7.png",
    clubName: "법과대학",
    move: "law",
  },
  {
    image: "/img/club-image8.png",
    clubName: "경영대학",
    move: "business",
  },
];

const ClubList: React.FC = () => {
  return (
    <Container>
      {data.map((club, index) => (
        <ClubListItem key={index} club={club} />
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
  width: 90%;
`;

export default ClubList;
