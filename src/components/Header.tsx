"use client";
import styled from 'styled-components';

const HeaderContainer = styled.header`
  max-width: 500px;
  width: 100%;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  height: 40px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  margin-top: 20px;
  background-color: #FFFFFF;
  z-index: 1000;
  &::before {
    content: "";
    position: absolute;
    top: -20px;
    left: 0;
    width: 100%;
    height: 20px;
    background-color: #FFFFFF;
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
