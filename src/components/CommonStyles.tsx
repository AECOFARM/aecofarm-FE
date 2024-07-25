import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 110px;
  margin-bottom: 120px;
  background-color: #ffffff;
`;

export const CategoryItemsContainer = styled.div`
  margin: 0 auto;
  margin-top: 60px;
`;

export const Container = styled.div`
  margin: 0 auto;
  padding: 15px;
  width: 90%;
  height: auto;
  border-radius: 5px;
  border: 0.5px solid #999999;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Title = styled.p`
  font-size: 1.3rem;
  font-weight: 700;
  color: #000000;
`;

export const Line = styled.hr`
  width: 100%;
  height: 0.5px;
  background-color: #999999;
  border: 0; 
`;

export const PaymentContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .payment {
    color: #D83752;
    font-size: 1.2rem;
    font-weight: 600;
  }
`;

