'use client'
import styled from 'styled-components';
import AppLayout from "@/components/layout/MobileLayout";

const HeadContainer = styled.div`
  position: absolute;
  top: 120px;
  margin-left: 32px;
`;


const ButtonContainer = styled.div`
  position: absolute;
  gap: 15px;
  margin-left: 32px;
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  width: 310px;
  padding: 13px;
  border-radius: 15px;
  border: 0px;
  color: #8E8F90;
  background-color: #F2F2F2;
  font-size: 16px;
`;

const SignUpPage = () => {
  return (
    <AppLayout>
      <ButtonContainer>
        <Button> 이름 </Button>
        <Button> 전화번호 </Button>
        <Button> 주소 </Button>
        <Button> 학번 </Button>
      </ButtonContainer>
    </AppLayout>
  );
};

export default SignUpPage;
