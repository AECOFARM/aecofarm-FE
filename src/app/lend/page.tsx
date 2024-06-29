'use client'
import styled from 'styled-components';
import AppLayout from "@/components/layout/MobileLayout";
import OrangeButton from '@/components/OrangeButton';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';

const Wrapper = styled.div`
 padding-top: 25px;
`;

const ButtonContainer = styled.div`
  display: flex;
  font-size: 14px;
  margin-top: 10px;
`;

const SortButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 22px;
  color: black;
  font-size: 15px; 

`;

const SortButton = styled.select`
  margin: 0 10px;
  color: black;
  border: 0px;
  background-color: white;
  font-size: 15px; 
  text-align: center;
  background-color: white;

  option {
    background: white;
    font-size: 15px; 
  }
`;


const DonateContainer = styled.div`
  margin-left: 110px;
  width: 110px;
  position: relative;
`;

const CheckDonateButton = styled.button`
  margin: 0 5px;
  color: black;
  border: 0px;
  background-color: white;
  width: auto;
`;

const CheckIcon = styled.img`
  position: absolute;
  width: 18px;
  right: 10px; /* 필요에 따라 조정 */
  top: 50%; /* 아이콘을 수직 중앙에 위치 */
  transform: translateY(-50%);
`;

const SignUpPage = () => {
  const router = useRouter();

  const login = () => {
    router.push('/lend');
  };

  const handleClick = () => {
    router.push('/sign-up');
  };

  return (
    <AppLayout>
      <Wrapper>
        <Header/>
        <ButtonContainer>
          <SortButtonContainer>
            <SortButton>
              <option key="최신순" value="latest">최신순</option>
              <option key="거리순" value="distance">거리순</option>
              <option key="낮은 가격순" value="low-price">낮은 가격순</option>
              <option key="높은 가격순" value="high-price">높은 가격순</option>
            </SortButton>
          </SortButtonContainer>

          <DonateContainer>
            <CheckDonateButton>기부 모아보기</CheckDonateButton>
            <CheckIcon src='/img/not-checked.svg' alt='check' />
          </DonateContainer>
        </ButtonContainer>  
      </Wrapper>
    </AppLayout>
  );
};

export default SignUpPage;
