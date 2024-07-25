"use client";
import styled from 'styled-components';
import Link from 'next/link';
import AppLayout from './layout/MobileLayout';

const HeaderContainer = styled.header`
  position: fixed;
  bottom: 0px;
  height: 60px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 -2px 2px rgba(0, 0, 0, 0.1);
`;

const NavContainer = styled.nav`
  display: flex;
  width: 100%;
  justify-content: space-around;
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
          <Link href="/borrow" passHref>
            <NavItem src='/img/borrow-icon.svg' alt='lend'/>
          </Link>
          <Link href="/lend" passHref>
            <NavItem src='/img/lend-icon.svg' alt='borrow'/>
          </Link>
          <Link href="/post" passHref>
            <NavItem src='/img/post-icon.svg' alt='post'/>
          </Link>
          <Link href="/club" passHref>
            <NavItem src='/img/club-icon.svg' alt='club'/>
          </Link>
          <Link href="/mypage" passHref>
            <NavItem src='/img/profile-icon.svg' alt='profile'/>
          </Link>
        </NavContainer>
      </HeaderContainer>
    </AppLayout>
  );
}

export default Navigation;
