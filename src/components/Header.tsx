"use client";
import styled from "styled-components";
import { useRouter } from "next/navigation";

const HeaderContainer = styled.header`
  max-width: 500px;
  width: 100%;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  height: 60px;
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  background-color: ${({ theme }) => theme.colors.white};
  z-index: 1000;
  &::before {
    content: "";
    position: absolute;
    top: -20px;
    left: 0;
    width: 100%;
    height: 20px;
    background-color: ${({ theme }) => theme.colors.white};
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 8.5rem;
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 20px;
  }
`;

const Header = () => {
  const router = useRouter();

  const moveSearchPage = () => {
    router.push("/search");
  };

  const moveAlarmPage = () => {
    router.push("/alarm");
  };

  const moveBorrowPage = () => {
    router.push("/borrow");
  };

  return (
    <HeaderContainer>
      <IconContainer onClick={moveSearchPage}>
        <img src="/search.svg" alt="search" />
      </IconContainer>
      <Logo onClick={moveBorrowPage}>
        <img src="/aecofarm-logo.svg" alt="logo" />
      </Logo>
      <IconContainer onClick={moveAlarmPage}>
        <img src="/bell.svg" alt="alarm" />
      </IconContainer>
    </HeaderContainer>
  );
};

export default Header;
