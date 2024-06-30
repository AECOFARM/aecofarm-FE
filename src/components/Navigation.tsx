"use client";
import styled from 'styled-components';
import AppLayout from './layout/MobileLayout';

const HeaderContainer = styled.header`
  position: fixed;
  bottom: 20px;
  height: 60px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NavContainer = styled.nav`
  display: flex;
  width: 100%;
  justify-content: space-around; /* 각 항목을 동일한 간격으로 배치 */
`;

const NavItem = styled.img`
  flex: 1;
  text-align: center;
  padding: 10px;
  cursor: pointer;
  height: 55px;
`;

const Navigation = () => {
    return (
      <AppLayout>
        <HeaderContainer>
          <NavContainer>
            <NavItem src='/img/lend-icon.svg' alt='lend'/>
            <NavItem src='/img/borrow-icon.svg' alt='lend'/>
            <NavItem src='/img/post-icon.svg' alt='lend'/>
            <NavItem src='/img/club-icon.svg' alt='lend'/>
            <NavItem src='/img/profile-icon.svg' alt='lend'/>
          </NavContainer>
        </HeaderContainer>
      </AppLayout>
    );
}

export default Navigation;
