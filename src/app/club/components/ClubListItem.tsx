import styled from "styled-components";
import React from "react";
import { useRouter } from "next/navigation";

interface Club {
  image: string;
  clubName: string;
  move: string;
}

interface Props {
  club: Club;
}

const Container = styled.div`
  width: 45%;
  border: 1px solid var(--gray5);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  gap: 5px;
  margin: 2.5%;
`;

const ImageContainer = styled.img`
  width: 90%;
  aspect-ratio: 1 / 1;
`;

const ClubName = styled.p`
  font-size: 1rem;
  font-weight: 600;
  color: var(--black);
`;

const ClubListItem: React.FC<Props> = ({club}) => {
  const router = useRouter();

  const moveDetail = () => {
    router.push(`club/${club.move}`);
  }

  return (
    <Container onClick={moveDetail}>
      <ImageContainer src = {club.image} />
      <ClubName>{club.clubName}</ClubName>
    </Container>
  );
};

export default ClubListItem;