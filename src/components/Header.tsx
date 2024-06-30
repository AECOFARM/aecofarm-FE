"use client";
import styled from 'styled-components';
import AppLayout from './layout/MobileLayout';

const HeaderContainer = styled.header`
  max-width: 500px;
  width: 100%;
  position: sticky;
  height: 40px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  margin-top: 20px;
  background-color: #FFFFFF;
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
      <AppLayout>
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
      </AppLayout>
        
    );
}

export default Header;
