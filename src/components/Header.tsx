"use client";
import styled from 'styled-components';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 45px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  z-index: 1000;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 9rem;
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
    return (
        <HeaderContainer>
            <IconContainer>
                <img src = "/search.svg" alt="search" />
            </IconContainer>
            <Logo>
                <img src="/aecofarm-logo.svg" alt="logo" />
            </Logo>
            <IconContainer>
                <img src = "/bell.svg" alt="alarm" />
            </IconContainer>
        </HeaderContainer>
    );
}

export default Header;
