import styled from "styled-components";

const PageContainer = styled.div`
  margin-top: 60px;
  margin-bottom: 80px;
`;

const MainLayout = (props: { children: React.ReactNode }) => {
    return (
      <PageContainer>
        {props.children}
      </PageContainer>
    );
};

export default MainLayout;