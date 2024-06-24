import styled from 'styled-components';

const AppLayout = (props: { children: React.ReactNode }) => {
  return (
    <Centering>
      <FixedWidth>{props.children}</FixedWidth>
    </Centering>
  );
};

const Centering = styled.div`
  display: flex;
  justify-content: center;
`;
const FixedWidth = styled.div`
  width: 500px;
  @media (max-width: 500px) { /* 화면 너비가 500px 이하가 되면 요소 너비를 100%로 고정*/
    width: 100%;
  }
`;
export default AppLayout;
